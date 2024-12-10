import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { toastManagementStore } from '@/stores/toastManagement.ts'

const toastManagement = toastManagementStore()
export const stepsManagementStore = defineStore('stepsManagement', () => {
  const stepsManagementState = ref([
    { name: 'Hello World', id: 1, funnelId: 1 },
    { name: 'World Hello', id: 2, funnelId: 1 },
    { name: 'Hello World', id: 3, funnelId: 1 },
    { name: 'World Hello', id: 4, funnelId: 1 },
  ])

  const getterSteps = computed(() => stepsManagementState.value)

  const getSteps = (funnelId) => {
    return getterSteps.value.filter((StepsInArray) => StepsInArray.funnelId == funnelId)
  }

  const editStep = (stepPayload) => {
    if (!stepPayload.newStepName) {
      toastManagement.errorToast('Inser a Valid Name')
      return
    }

    const index = getterSteps.value.findIndex((StepsInArray) => StepsInArray.id === stepPayload.stepsData.id)
    stepsManagementState.value[index].name = stepPayload.newStepName
    toastManagement.succesToast('Step Edited with Success!')
  }

  const deleteStep = (stepPayload) => {
    if (!stepPayload.id) {
      toastManagement.errorToast('An Error Ocurred while Deleting! Try Again')
      return
    }
    stepsManagementState.value = stepsManagementState.value.filter((StepInArray) => StepInArray.id !== stepPayload.id)
    toastManagement.succesToast('Step Deleted with Success!')
  }

  const createStep = (newStepPayload) => {
    if (!newStepPayload.value.name) {
      toastManagement.errorToast('Inser a Valid Name')
      return
    }

    const newStep = ref(newStepPayload.value)
    const id = stepsManagementState.value.length + 1
    newStep.value = {
      ...newStep.value,
      id: id
    }

    stepsManagementState.value.push(newStep.value)
    toastManagement.succesToast('Step Created with Success!')
  }

  return { getSteps, editStep, deleteStep, stepsManagementState, createStep }
})
