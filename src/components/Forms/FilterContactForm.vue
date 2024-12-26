<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import Fuse from 'fuse.js'
import { contactsManagementStore } from '@/stores/contactsManagement.ts'
import { funnelsManagementStore } from '@/stores/funnelsManagement.ts'
import { toastManagementStore } from '@/stores/toastManagement.ts'
import { userConfigStore } from '@/stores/userConfigManagement.ts'

const showFiltersState = ref(false)

const handleFilterState = () => {
  showFiltersState.value = !showFiltersState.value
}

const userStore = userConfigStore()
const userColorData = userStore.userColorData
const contactStore = contactsManagementStore()
const funnelsStore = funnelsManagementStore()
const toastStore = toastManagementStore()
const moneyInputConfig = {
  decimal: ',',
  thousands: '.',
  prefix: 'R$ ',
  suffix: '',
  precision: 2,
  masked: false,
  disableNegative: true
}
const funnelsData = computed(() => funnelsStore.funnelsDataGetter)
const funnelToFilter = ref('')
const contactsData = computed(() => contactStore.contactsGetterState)
const filtersPayload = ref({
    name: '',
    tradingValueFrom: '',
    tradingValueTo: '',
    contactCompany: '',
    contactNumber: '',
    contactCNPJ: '',
    funnelId: ''
  }
)

const filterContacts = () => {
  const filteredData = ref([])
  const filteredDataFromTradingValue = ref([])
  const blockedContacts = ref([])
  const fuseConfig = ref({
    keys: [
      { name: 'name', getFn: (contact) => contact.name },
      { name: 'contactCompany', getFn: (contact) => contact.contactCompany },
      { name: 'contactNumber', getFn: (contact) => contact.contactNumber },
      { name: 'contactCNPJ', getFn: (contact) => contact.contactCNPJ },
      { name: 'funnelId', getFn: (contact) => contact.funnelId }
    ],
    threshold: 0.2
  })
  const fuse = new Fuse(contactsData.value, fuseConfig.value)

  if (filtersPayload.value.tradingValueFrom !== 'R$ 0,00' || filtersPayload.value.tradingValueTo !== 'R$ 0,00') {
    const tradingValuePayload = ref({})
    if (filtersPayload.value.tradingValueFrom !== 'R$ 0,00') {
      tradingValuePayload.value = {
        ...tradingValuePayload.value,
        tradingValueFrom: filtersPayload.value.tradingValueFrom
      }
    }

    if (filtersPayload.value.tradingValueTo !== 'R$ 0,00') {
      tradingValuePayload.value = {
        ...tradingValuePayload.value,
        tradingValueTo: filtersPayload.value.tradingValueTo
      }
    }

    const filteredTradingValueData = contactStore.filterContactsByValue(tradingValuePayload.value)
    filteredDataFromTradingValue.value = filteredTradingValueData.contactPassed
    blockedContacts.value = filteredTradingValueData.contactBlocked
  }

  const fuseToSearch = ref({})
  const filterKeys = Object.keys(filtersPayload.value)
  filterKeys.forEach((keyFiltered) => {
    const isFieldNotEmpty = filtersPayload.value[keyFiltered] && keyFiltered !== 'tradingValueFrom' && keyFiltered !== 'tradingValueTo' ? true : false
    if (isFieldNotEmpty) {
      fuseToSearch.value[keyFiltered] = filtersPayload.value[keyFiltered]
    }
  })


  const contactsReturnedFromFuse = fuse.search(fuseToSearch.value)
  contactsReturnedFromFuse.forEach((contactFilteredFromFuse) => {
    const isContactBlockedFromOtherFilter = blockedContacts.value.find(
      (contactBlocked) => contactBlocked.id === contactFilteredFromFuse.item.id)

    if (!isContactBlockedFromOtherFilter) {
      filteredData.value.push(contactFilteredFromFuse.item)
    }
  })

  if (contactsReturnedFromFuse && filteredDataFromTradingValue.value.length > 0) {
    filteredDataFromTradingValue.value.map((contactFilteredFromTrading) => {
      const isContactInBothFilters = contactsReturnedFromFuse.find((contactReturnFromFuse) => contactReturnFromFuse.item.id === contactFilteredFromTrading.id)
      if (isContactInBothFilters) {
        const isContactAlreadyInFinalArray = filteredData.value.some((contactInArray) => contactInArray.id === contactFilteredFromTrading.id)

        if (!isContactAlreadyInFinalArray) {
          funnelsData.value.push(contactFilteredFromTrading)
        }
      }
    })
  }

  contactStore.setFilteredContactsData(filteredData.value)
}

const warmUpMessage = () => {
  toastStore.infoToast('In Development')
}

watch(filtersPayload, (newValue) => {
  const filterKeys = Object.keys(newValue)
  const isFiltersEmpty = ref(true)

  filterKeys.forEach((filterKey) => {
    if (filterKey === 'tradingValueFrom' || filterKey === 'tradingValueTo') {
      filtersPayload.value[filterKey] !== 'R$ 0,00' ? isFiltersEmpty.value = false : ''
    } else {
      !filtersPayload.value[filterKey] ? '' : isFiltersEmpty.value = false
    }
  })

  if (isFiltersEmpty.value) contactStore.setFilteredContactsData(contactsData.value)
}, { deep: true } )

watch(funnelToFilter, (newValue) => {
  filtersPayload.value.funnelId = `${newValue.id}`
})

</script>

<template>
  <div class="mx-5 mb-3 d-flex">
    <button @click="handleFilterState" type="button" :class="['me-3 btn', userColorData.emptyBtn]">
      <i class="bi bi-filter me-3"></i>
      Filters
      <i :class="[showFiltersState ? 'bi bi-chevron-compact-up' : 'bi bi-chevron-compact-down', 'ms-3']"></i>
    </button>
    <button @click="filterContacts" type="button" :class="['btn', userColorData.btn]"><i class="bi bi-search me-3"></i> Search
    </button>
  </div>
  <div class="mx-5 mb-3" v-if="showFiltersState">
    <div class="d-xl-flex">
      <div class="col-xl-6 col-12">
        <label class="d-block">Contact Name: </label>
        <input v-model="filtersPayload.name" placeholder="John Doe" class="form-control py-2" />
      </div>
      <div class="d-sm-flex col-xl-6  mt-3  mt-xl-0 col-12">
        <div class="col-sm-6 col-12 mx-xl-3">
          <label class="d-block">Trading Value Range: </label>
          <div class="w-100 d-flex">
            <input v-money3="moneyInputConfig" v-model.lazy="filtersPayload.tradingValueFrom" placeholder="From R$ 0,00"
                   class="me-1 form-control py-2" />
            <input v-money3="moneyInputConfig" v-model.lazy="filtersPayload.tradingValueTo"
                   placeholder="To R$ 1.000.000"
                   class="ms-1 form-control py-2" />
          </div>
        </div>
        <div @click="warmUpMessage" class="mt-3 mt-sm-0 col-sm-6 col-12">
          <label class="ms-sm-3 ms-xl-0">Created At: </label>
          <div class=" w-100 d-flex">
            <input readonly v-model="filtersPayload.createdAtFrom" placeholder="From 01/01/2024"
                   class="me-1 form-control ms-xl-0 ms-sm-3 py-2" />
            <input readonly v-model="filtersPayload.createdAtTo" placeholder="To 31/12/2024"
                   class="ms-1 form-control py-2" />
          </div>
        </div>
      </div>
    </div>
    <div class="d-xl-flex mt-3">
      <div class="d-sm-flex me-3 col-xl-6 col-12">
        <div class="col-12 col-sm-6">
          <label class="d-block">Contact Company: </label>
          <input v-model="filtersPayload.contactCompany" placeholder="John Doe Company" class=" form-control py-2" />
        </div>
        <div class="col-12 col-sm-6 mt-3 mt-sm-0">
          <label class="d-block">Contact Number: </label>
          <input v-mask="'+## (##) #####-####'" v-model="filtersPayload.contactNumber" placeholder="+55 (XX) 9XXXX-XXXX"
                 class="ms-1 form-control py-2" />
        </div>
      </div>
      <div class="mt-3 mt-xl-0 d-sm-flex col-xl-6 col-12">
        <div class="col-12 col-sm-6">
          <label class="d-block">Contact CNPJ: </label>
          <input v-mask="'##-###-###/####-##'" v-model="filtersPayload.contactCNPJ" placeholder="XX-XXX-XXX/0001-XX"
                 class=" form-control py-2" />
        </div>
        <div class="col-12 col-sm-6">
          <label class="d-block">Contact Funnel: </label>
          <select
            v-model="funnelToFilter"
            class="form-select py-2 ms-1">
            <option
              :value="funnel"
              :key="funnel.id"
              v-for="funnel in funnelsData"
            >
              {{ funnel.name }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
label {
  margin-bottom: 10px;
}

</style>
