<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { modalsManagementStore } from '@/stores/modalsManagement.js'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useRoute } from 'vue-router'
import { toastManagementStore } from '@/stores/toastManagement.js'
import { contactsManagementStore } from '@/stores/contactsManagement.js'
import { stepsManagementStore } from '@/stores/stepsManagement.js'
import { userConfigStore } from '@/stores/userConfigManagement.js'

const route = useRoute()
const toastStore = toastManagementStore()
const modalStore = modalsManagementStore()
const contactStore = contactsManagementStore()
const stepsStore = stepsManagementStore()
const userStore = userConfigStore()
const userColorData = userStore.userColorData
const modalInEditMode = ref(false)
const stepsData = computed(() => stepsStore.getSteps(route.params.id))
const modalDataFromStore = computed(() => modalStore.modalData)
const contactOriginalMockup = ref('')
const cantChooseStep = ref(false)

const validationSchema = {
  contactName: yup.string().required('Name field can\'t be empty')
    .max(20, 'Name field reached max size'),
  contactInterestedIn: yup.string().required('Interested In field can\'t be empty')
    .max(60, 'Interested In field reached max size'),
  contactTradingValue: yup.string().required('Trading Value field can\'t be empty')
    .max(15, 'Trading Value field reached max size'),
  contactNumber: yup.string().required('Number field can\'t be empty')
    .max(19, 'Contact Number field reached max size')
    .min(19, 'Insert a Phone Number with the format +55 (DD) 9XXXX-XXXX')
  ,
  contactStep: yup.string().required(),
  contactCompany: yup.string(),
  contactAddress: yup.string(),
  contactCNPJ: yup.string()
    .max(18, 'CNPJ Field reached max size')
}

const { defineField, values, validate, setValues } = useForm({
  validationSchema
})

const moneyInputConfig = {
  decimal: ",",
  thousands: ".",
  prefix: "R$ ",
  suffix: "",
  precision: 2,
  masked: false,
  disableNegative: true,
}
const [contactName] = defineField('contactName')
const [contactInterestedIn] = defineField('contactInterestedIn')
const [contactTradingValue] = defineField('contactTradingValue')
const [contactNumber] = defineField('contactNumber')
const [contactStep] = defineField('contactStep')
const [contactCompany] = defineField('contactCompany')
const [contactAddress] = defineField('contactAddress')
const [contactCNPJ] = defineField('contactCNPJ')
const [contactFavoriteState] = defineField('contactFavoriteState')

const handleModalState = () => {
  modalStore.handleModalState()
}

const deleteContact = () => {
  contactStore.deleteContact(contactOriginalMockup.value)
  handleModalState()
}

const handleNewStepForContact = (stepData) => {
  setValues({
    contactStep: stepData.id
  })

}

const checkFirstStepWhenMounted = () => {
  const checkIfStartStepExists = stepsData.value.find((StepInArray) => StepInArray.name == 'No Contact')
  if (!checkIfStartStepExists) {
    if (!stepsData.value[0]) {
      cantChooseStep.value = true
      return
    }

    setValues({
      contactStep: stepsData.value[0].id
    })
    return
  }

  setValues({
    contactStep: checkIfStartStepExists.id
  })
}

const updateContact = async () => {
  const isValid = await validate()

  if (!isValid.valid) {
    const errors = Object.values(isValid.errors)
    toastStore.errorToast(errors[0])
    return
  }

  if (contactCNPJ.value) {
    if (contactCNPJ.value.length < 18) {
      toastStore.errorToast('Insert a Valid CNPJ with the format XX-XXX-XXX/0001-XX')
      return
    }
  }

  const contactPayload = ref(contactOriginalMockup.value)
  contactPayload.value.name = contactName.value
  contactPayload.value.interestIn = contactInterestedIn.value
  contactPayload.value.tradingValue = contactTradingValue.value
  contactPayload.value.contactNumber = contactNumber.value
  contactPayload.value.contactCompany = contactCompany.value
  contactPayload.value.contactAddress = contactAddress.value
  contactPayload.value.contactCNPJ = contactCNPJ.value
  contactPayload.value.stepId = contactStep.value

  contactStore.updateContact(contactPayload.value)
  handleModalState()
}

const clearInputData = () => {
  setValues({
    contactName: '',
    contactInterestedIn: '',
    contactTradingValue: '',
    contactNumber: '',
    contactStep: '',
    contactCompany: '',
    contactAddress: '',
    contactCNPJ: ''
  })
}

const createContact = async () => {
  const isValid = await validate()

  if (!isValid.valid) {
    const errors = Object.values(isValid.errors)
    toastStore.errorToast(errors[0])
    return
  }

  if (contactCNPJ.value) {
    if (contactCNPJ.value.length < 18) {
      toastStore.errorToast('Insert a Valid CNPJ with the format XX-XXX-XXX/0001-XX')
      return
    }
  }

  const payload = ref({
    name: contactName.value,
    stepId: contactStep.value,
    funnelId: parseInt(route.params.id),
    interestIn: contactInterestedIn.value,
    tradingValue: contactTradingValue.value,
    contactNumber: contactNumber.value,
    contactCompany: contactCompany.value,
    contactAddress: contactAddress.value,
    contactCNPJ: contactCNPJ.value
  })

  contactStore.createNewContact(payload)
  handleModalState()
}

const handleContactFavoriteState = () => {
  setValues({
    contactFavoriteState: !contactFavoriteState.value
  })
  contactStore.setFavoriteState(contactOriginalMockup.value)
}

watch(stepsData.value, (newValue) => {
  if (newValue.length > 0) {
    cantChooseStep.value = false
  }
})

watch(modalDataFromStore.value, (newValue) => {
  if (newValue.modalView == 'CreateOrUpdateContact' && newValue.modalState) {

    if (newValue.editMode) {
      modalInEditMode.value = true
      contactOriginalMockup.value = newValue.modalData
      setValues({
        contactName: newValue.modalData.name,
        contactInterestedIn: newValue.modalData.interestIn,
        contactTradingValue: newValue.modalData.tradingValue,
        contactNumber: newValue.modalData.contactNumber,
        contactStep: newValue.modalData.stepId,
        contactCompany: newValue.modalData.contactCompany,
        contactAddress: newValue.modalData.contactAddress,
        contactCNPJ: newValue.modalData.contactCNPJ,
        contactFavoriteState: newValue.modalData.favorite
      })

      return
    }

    modalInEditMode.value = false
    clearInputData()
    checkFirstStepWhenMounted()
    return
  }
})

onMounted(() => {
  checkFirstStepWhenMounted()
})

</script>

<template>
  <div
    :class="[ modalDataFromStore.modalView == 'CreateOrUpdateContact' && modalDataFromStore.modalState ? 'd-block' : '' , 'modal modal-background']"
    tabindex="-1" role="dialog">
    <div style="right: 0px" class="modal-dialog position-absolute modal-lg m-0" role="document">
      <div class="modal-content vh-100 px-3">
        <div :class="['d-flex modal-header justify-content-between', userColorData.text]">
          <div class="d-flex align-items-center">
            <i @click="handleModalState" class="bi bi-chevron-right fs-5 me-3"></i>
            <h5 class="fw-bold modal-title"> {{ modalInEditMode ? 'Update' : 'Create' }} Contact</h5>
          </div>
          <div class="d-flex align-items-center">
            <button
              v-if="modalInEditMode"
              class="bg-transparent border-0">
              <i
                @click="handleContactFavoriteState"
                :class="[ contactFavoriteState ? 'bi-pin-angle-fill' : 'bi-pin-angle', 'bi py-1 px-2 rounded-2 text-white', userColorData.color]"></i>
            </button>
          </div>

        </div>
        <div :class="['modal-body overflow-y-auto', userColorData.text]">
          <p class="fw-bold">Mandatory Information</p>
          <div class="my-3">
            <label class="mb-1">Name: </label>
            <input v-model="contactName" class="form-control" placeholder="JohnDoe" />
          </div>
          <div class="my-3">
            <label class="mb-1">Contact Interest: </label>
            <textarea v-model="contactInterestedIn" rows="7" class="form-control"
                      placeholder="Product / Service the Contact Is Interest In" />
          </div>
          <div class="my-3 ">
            <label class="mb-1">Trading Value: </label>
            <input v-money3="moneyInputConfig"  v-model.lazy="contactTradingValue" class="form-control " placeholder="R$ 1.000.000,00" />
          </div>
          <div class="my-3 ">
            <label class="mb-1">Contact Number: </label>
            <input v-mask="'+## (##) #####-####'" v-model="contactNumber" class="form-control " placeholder="+55 (DD) 0000-0000" />
          </div>
          <div class="my-3 " v-if="!cantChooseStep">
            <label class="mb-1">Contact Step: </label>
            <div class="d-flex flex-wrap">
              <div
                v-for="(stepData, index) in stepsData"
                class="">
                <button
                  :style="{ borderRadius: index == stepsData.length - 1 ? '0px 10px 10px 0px' : index == 0 ? '10px 0px 0px 10px' : '0px 0px 0px 0px' }"
                  @click="handleNewStepForContact(stepData)"
                  type="button"
                  :class="[ stepData.id === contactStep ? userColorData.btn : userColorData.emptyBtn ,'btn h-100 px-3 py-2']">
                  {{ stepData.name }}
                </button>
              </div>
            </div>
          </div>
          <div>
            <p class="fw-bold">Optional Information</p>
            <div class="my-3 ">
              <label class="mb-1">Contact Company: </label>
              <input v-model="contactCompany" class="form-control" placeholder="JohnDoe Company Express" />
            </div>
            <div class="my-3 ">
              <label class="mb-1">Contact Address: </label>
              <input v-model="contactAddress" class="form-control" placeholder="Main Avenue 555" />
            </div>
            <div class="my-3 ">
              <label class="mb-1">Contact CNPJ: </label>
              <input v-mask="'##-###-###/####-##'" v-model="contactCNPJ" class="form-control" placeholder="XX-XXX-XXX/0001-XX" />
            </div>
          </div>
        </div>
        <div class="modal-footer d-flex">
          <button @click="deleteContact" v-if="modalInEditMode" type="button" :class="['btn py-2 px-3', userColorData.emptyBtn]">Delete Contact</button>
          <button @click="modalInEditMode ? updateContact() : createContact()  " type="button" :class="['text-white btn py-2 px-3 text-white', userColorData.btn ]"> {{ modalInEditMode ? 'Update' : 'Create' }}  Contact</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bi-chevron-right {
  cursor: pointer;
}

.modal-content {
  min-width: 344px;
  width: 100vw;
  max-width: 600px;
}
</style>
