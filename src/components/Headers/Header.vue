<script setup>
import { userConfigStore } from '@/stores/userConfigManagement.ts'
import { computed, ref } from 'vue'
import { headerManagementStore } from '@/stores/headerManagement.ts'
import { modalsManagementStore } from '@/stores/modalsManagement.ts'
import { useRoute, useRouter } from 'vue-router'
import { stepsManagementStore } from '@/stores/stepsManagement.ts'
import { toastManagementStore } from '@/stores/toastManagement.ts'
import InputSearchContact from '@/components/Cards/InputSearchFunnel.vue'
import { funnelsManagementStore } from '@/stores/funnelsManagement.ts'
import { contactsManagementStore } from '@/stores/contactsManagement.ts'
import Fuse from 'fuse.js'
import InputSearchFunnel from '@/components/Cards/InputSearchContact.vue'

const userConfig = userConfigStore()
const stepStore = stepsManagementStore()
const toastStore = toastManagementStore()
const funnelsStore = funnelsManagementStore()
const funnelsData = computed(() => funnelsStore.funnelsDataGetter)
const contactStore = contactsManagementStore()
const router = useRouter()
const headerStore = headerManagementStore()
const headerConfigData = computed(() => headerStore.headerDataGetter)
const userColorData = computed(() => userConfig.userColorData)
const modalsStore = modalsManagementStore()
const userConfigWidth = computed(() => userConfig.userWidth)
const route = useRoute()
const userConfigName = computed(() => userConfig.userName)
const inputData = ref([])
const inputSearch = ref('')
const fuseConfigFunnelsAndContacts = {
  keys: [
    { name: 'name', getFn: (object) => object.name }
  ],
  threshold: 0.2
}

const resetInputData = () => {
  inputData.value = []
  inputSearch.value = ''
}

const searchAction = () => {
  const dataToSearch = headerConfigData.value.searchType === 'Funnel' ? funnelsData.value : contactStore.getContactsByFunnelId(route.params.id)
  const fuse = new Fuse(dataToSearch, fuseConfigFunnelsAndContacts)

  inputData.value = fuse.search(inputSearch.value)
}


const mobileHeaderState = ref(false)
const handleMobileHeaderState = () => {
  mobileHeaderState.value = !mobileHeaderState.value
}

const dispatchButtonAction = async () => {
  if (headerConfigData.value.action === 'Create Contact') {
    const isStepEmpty = await stepStore.isFunnelEmpty(route.params.id)
    if (isStepEmpty) {
      toastStore.errorToast("Create At Least One Step!")
      return
    }
  }
  modalsStore.handleModalState( { action: headerConfigData.value.action } )
}

const handleUserRoute = (routeToPush) => {
  router.push({ name: routeToPush.routeName })
  handleMobileHeaderState()
}

const RouterOptions = [
  {
    name: 'CRM Options',
    icon: 'bi bi-layers-fill',
    id: 1,
    router: [
      {
        name: 'Funnels',
        routeName: 'funnelsView',
        icon: 'bi bi-funnel-fill',
        id: 1
      },
      {
        name: 'Contacts',
        routeName: 'ContactsListView',
        icon: 'bi bi-person-rolodex',
        id: 2
      },
      {
        name: 'Reports',
        routeName: '',
        icon: 'bi bi-file-earmark-plus-fill',
        id: 3
      },
      {
        name: 'Favorites',
        routeName: 'FavoriteListView',
        icon: 'bi bi-pin-angle-fill',
        id: 4
      },
      {
        name: 'Settings',
        routeName: 'User Settings',
        icon: 'bi bi-gear-fill',
        id: 5
      }
    ]
  },
]

</script>

<template>
  <div
    v-if="userConfigWidth > 992"
    class="d-flex align-items-center header-desktop w-100 ">
    <div class="w-50 d-flex flex-column justify-content-center h-100
">
        <p :class="['ms-5 m-0 fs-4 fw-bold', userColorData.text]">Welcome {{ userConfigName }}</p>
      <p :class="['ms-5 fs-4 m-0 fw-bold', userColorData.text]"> {{ headerConfigData.headerMessage }} </p>
    </div>
    <div class="w-25 h-100 d-flex flex-column justify-content-center position-relative">
      <input v-model="inputSearch" @input="() => searchAction()" v-if="headerConfigData.inputMessage" :placeholder="headerConfigData.inputMessage" class="form-control py-2 w-100" />
      <div>
        <div v-if="inputData.length > 0" class="mt-2 input-drop-down py-2 bg-white z-3 rounded-3 px-3 w-100 position-absolute">
          <InputSearchFunnel
            @click="resetInputData"
            v-if="headerConfigData.searchType === 'Funnel'"
            v-for="funnelData in inputData"
            :funnelData="funnelData.item"
          />
          <InputSearchContact
            @click="resetInputData"
            v-else-if="headerConfigData.searchType === 'Contacts'"
            v-for="contactData in inputData"
            :contactData="contactData.item"
          />
        </div>
        <div v-if="inputData.length === 0 && inputSearch" class="mt-2 text-secondary input-drop-down d-flex align-items-center py-2 bg-white z-3 rounded-3 px-3 w-100 position-absolute">
          <i class="bi bi-exclamation-diamond"></i>
          <p class="m-0 ms-3"> Nothing was Found </p>
        </div>
      </div>

    </div>
    <div class="w-25 h-100 d-flex align-items-center justify-content-center">
      <button v-if="headerConfigData.buttonMessage" @click="dispatchButtonAction" type="button" :class="['btn fs-6 w-50 py-2', userColorData.btn]"> {{ headerConfigData.buttonMessage }} </button>
    </div>
  </div>

  <div v-else >
    <div :class="['flex-column  text-center d-flex align-items-center justify-content-center mobile-header', userColorData.color]">
      <h1 class="text-white title">CUSTOMER RELATIONSHIP</h1>
      <h2 class="text-white sub-title">MANAGEMENT</h2>
      <button style="top: 10px; left: 10px" class="position-absolute border-0 bg-transparent">
        <i @click="handleMobileHeaderState" class="bi bi-list fs-2 text-white"></i>
      </button>
    </div>
    <div v-if="!mobileHeaderState" class="button-container  mt-3  w-100">
      <button v-if="headerConfigData.buttonMessage" @click="dispatchButtonAction" type="button" :class="['ms-5 btn px-5', userColorData.btn]"> {{ headerConfigData.buttonMessage }} </button>
    </div>
    <div v-if="mobileHeaderState" :class="['d-flex align-items-center flex-column mobile-header-body position-absolute w-100 z-3', userColorData.color]">
      <div class="w-75">
        <div
          :key="routerOption.id"
          v-for="routerOption in RouterOptions"
          class="w-100 d-flex flex-column justify-content-center mb-5"
        >
          <div class="d-flex align-items-center py-2 router-option">
            <i :class="[routerOption.icon, 'me-4 text-white fs-3']"></i>
            <p class="m-0 text-white fs-6">{{ routerOption.name }}</p>
          </div>
          <div
            @click="handleUserRoute(option)"
            v-for="option in routerOption.router"
            class="py-2 d-flex align-items-center router router-option mx-5 ">
            <i :class="[option.icon, 'text-white me-4 fs-5 ']"></i>
            <p class="m-0 text-white fs-6"> {{ option.name }} </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-drop-down {
  border: 1px solid rgba(211, 211, 211, 0.71);
}

.router-option {
  border-bottom: 1px solid white;
}

.router {
  cursor: pointer;
}

.mobile-header {
  height: 250px;
}

.mobile-header-body {
  height: calc(100vh - 250px);
}

.title {
  font-size: 20px;
  letter-spacing: 3px;
}


.sub-title {
  font-size: 20px;
  letter-spacing: 18px;
}

.header-desktop {
  height: 145px;
}
</style>
