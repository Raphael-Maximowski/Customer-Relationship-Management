import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { toastManagementStore } from '@/stores/toastManagement.ts'
import { contactsManagementStore } from '@/stores/contactsManagement.ts'

export const stepsManagementStore = defineStore('stepsManagement', () => {

  const stepsDefault = ['No Contact', 'Contact Made', 'Accepted', 'Rejected']

  const stepsManagementState = ref([
    { name: 'No Contact', id: 1, funnelId: 1, stepPostion: 3 },
    { name: 'Contact Made', id: 2, funnelId: 1, stepPostion: 2 },
    { name: 'Accepted', id: 3, funnelId: 1, stepPostion: 1 },
    { name: 'Rejected', id: 4, funnelId: 1, stepPostion: 0 },
  ])

  const getterSteps = computed(() => stepsManagementState.value)

  const orderSteps = (draggableData) => {
    console.log("Data Received: ", draggableData)
  }

  const isFunnelEmpty = (funnelId) => {
    const StepsInFunnel = stepsManagementState.value.filter((StepsInArray) => StepsInArray.funnelId == funnelId)
    return StepsInFunnel.length === 0 ? true : false
  }

  const getSteps = (funnelId) => {
    const stepsInStore = getterSteps.value.filter((StepsInArray) => StepsInArray.funnelId == funnelId)
    const stepsInOrder = stepsInStore.sort((a, b) => a.stepPostion - b.stepPostion)
    return stepsInOrder
  }

  const editStep = (stepPayload) => {
    const toastManagement = toastManagementStore()
    if (!stepPayload.newStepName) {
      toastManagement.errorToast('Inser a Valid Name')
      return
    }

    const index = getterSteps.value.findIndex((StepsInArray) => StepsInArray.id === stepPayload.stepsData.id)
    stepsManagementState.value[index].name = stepPayload.newStepName
    toastManagement.succesToast('Step Edited with Success!')
  }

  const deleteStepOnCascade = (funnelId) => {
    const contactsStore = contactsManagementStore()
    const stepsToCascadeContacts = ref(stepsManagementState.value.filter((stepInArray) => stepInArray.funnelId === funnelId))
    for (let i = 0; i < stepsToCascadeContacts.value.length; i++) {
      contactsStore.deleteCascadeContacts(stepsToCascadeContacts.value[i].id)
    }
    stepsManagementState.value = stepsManagementState.value.filter((stepInArray) => stepInArray.funnelId !== funnelId )
  }

  const deleteStep = (stepPayload) => {
    const contactsStore = contactsManagementStore()
    const toastManagement = toastManagementStore()
    if (!stepPayload) {
      toastManagement.errorToast('An Error Ocurred while Deleting! Try Again')
      return
    }
    contactsStore.deleteCascadeContacts(stepPayload)
    stepsManagementState.value = stepsManagementState.value.filter((StepInArray) => StepInArray.id !== stepPayload)
    toastManagement.succesToast('Step Deleted with Success!')
  }

  const createStep = (newStepPayload) => {
    const toastManagement = toastManagementStore()
    if (!newStepPayload.value.name) {
      toastManagement.errorToast('Inser a Valid Name')
      return
    }
    const newStep = ref(newStepPayload.value)

    const id = getterSteps.value.length === 0 ? 1 : getterSteps.value[getterSteps.value.length - 1].id + 1

    newStep.value = {
      ...newStep.value,
      id: id
    }
    stepsManagementState.value.push(newStep.value)
    toastManagement.succesToast('Step Created with Success!')
  }

  const createStepsForDefaultFunnel = (funnelId) => {
    for (let i = 0; i < stepsDefault.length; i++) {
      const payload = ref({
        name: stepsDefault[i],
        id: stepsManagementState.value.length + 1,
        funnelId: funnelId,
        stepPostion: i
      })

      console.log("Step Crated: ", payload.value)
      stepsManagementState.value.push(payload.value)
    }
  }

  return { orderSteps ,getSteps, editStep, deleteStep, stepsManagementState, createStep, createStepsForDefaultFunnel, deleteStepOnCascade, isFunnelEmpty }
})
