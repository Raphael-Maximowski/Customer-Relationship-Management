import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { toastManagementStore } from '@/stores/toastManagement.js'
import { contactsManagementStore } from '@/stores/contactsManagement.js'

export const stepsManagementStore = defineStore('stepsManagement', () => {
  const contactsStore = contactsManagementStore()
  const stepsDefault = ['No Contact', 'Contact Made', 'Accepted', 'Rejected']

  const stepsManagementState = ref([
    { name: 'No Contact', id: 1, funnelId: 1, stepPostion: 0 },
    { name: 'Contact Made', id: 2, funnelId: 1, stepPostion: 1 },
    { name: 'Accepted', id: 3, funnelId: 1, stepPostion: 2 },
    { name: 'Rejected', id: 4, funnelId: 1, stepPostion: 3 },
  ])

  const findSuccessStepsFromFunnel = (funnelId) => {
    const succesStep = stepsManagementState.value.find((stepInState) =>
      stepInState.funnelId == funnelId && stepInState.name == 'Accepted') || null

    if (!succesStep) return
    return contactsStore.succedContactsFromStep(succesStep.id)

  }

  const findRejectedStepFromFunnel = (funnelId) => {
    const rejectedStepFromFunnel = stepsManagementState.value.find(
      (stepInState) => stepInState.funnelId == funnelId && stepInState.name == 'Rejected'
    ) || null;
    if (!rejectedStepFromFunnel) return
    return contactsStore.rejectedContactsFromStep(rejectedStepFromFunnel.id)
  }

  const percentageByFunnelReport = (funnelId) => {
    const filteredSteps = stepsManagementState.value.filter((stepInArray) => stepInArray.funnelId == funnelId)
    const labelNames = ref([])
    const data = ref([])
    filteredSteps.forEach((stepInArray) => {
      const contactsInStep = contactsStore.percentageByFunnel(stepInArray.id)
      labelNames.value.push(stepInArray.name)
      data.value.push(contactsInStep)
    })

    const finalData = {
      labels: labelNames.value,
      contactsData: data.value
    }
    return finalData
  }

  const filterFunnelProfit = (funnelsToFilter) => {

    const funnelsData = funnelsToFilter
    const validFunnels = ref([])
    const validSteps = ref([])

    funnelsData.map((funnelInArray) => {
      stepsManagementState.value.map((stepInArray) => {
        if (stepInArray.funnelId == funnelInArray.id && stepInArray.name == 'Accepted') {
          validFunnels.value.push(funnelInArray.name)
          validSteps.value.push(stepInArray)
        }
      })
    })

    const profitValues = ref(contactsStore.filterContactsByProfit(validSteps.value))

    const finalData = {
      funnels: validFunnels.value,
      values: profitValues.value
    }

    return finalData
  };

  const getterSteps = computed(() => stepsManagementState.value)

  const orderSteps = (draggableData) => {
    const steps = getSteps(draggableData.moved.element.funnelId)

    if (draggableData.moved.newIndex > draggableData.moved.oldIndex) {
      for (let i = 0; i < steps.length; i++) {
        if (steps[i].stepPostion <= draggableData.moved.newIndex
          && steps[i].stepPostion != draggableData.moved.oldIndex
          && steps[i].stepPostion > draggableData.moved.oldIndex) {
          const index = stepsManagementState.value.findIndex((StepInArray) => StepInArray.id == steps[i].id)
          stepsManagementState.value[index].stepPostion = stepsManagementState.value[index].stepPostion - 1
        }
        const index = stepsManagementState.value.findIndex((StepInArray) => StepInArray.id == draggableData.moved.element.id)
        stepsManagementState.value[index].stepPostion = draggableData.moved.newIndex
      }
      return
    }

    for (let i = 0; i < steps.length; i++) {
      if (steps[i].stepPostion >= draggableData.moved.newIndex
        && steps[i].stepPostion != draggableData.moved.oldIndex
        && steps[i].stepPostion < draggableData.moved.oldIndex
      ) {
        const index = stepsManagementState.value.findIndex((StepInArray) => StepInArray.id == steps[i].id)
        stepsManagementState.value[index].stepPostion = stepsManagementState.value[index].stepPostion + 1
      }

      const index = stepsManagementState.value.findIndex((StepInArray) => StepInArray.id == draggableData.moved.element.id)
      stepsManagementState.value[index].stepPostion = draggableData.moved.newIndex
    }
  }

  const isFunnelEmpty = (funnelId) => {
    const StepsInFunnel = stepsManagementState.value.filter((StepsInArray) => StepsInArray.funnelId == funnelId)
    return StepsInFunnel.length == 0 ? true : false
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

    const index = getterSteps.value.findIndex((StepsInArray) => StepsInArray.id == stepPayload.stepsData.id)
    stepsManagementState.value[index].name = stepPayload.newStepName
    toastManagement.succesToast('Step Edited with Success!')
  }

  const deleteStepOnCascade = (funnelId) => {
    const stepsToCascadeContacts = ref(stepsManagementState.value.filter((stepInArray) => stepInArray.funnelId == funnelId))

    for (let i = 0; i < stepsToCascadeContacts.value.length; i++) {
      contactsStore.deleteCascadeContacts(stepsToCascadeContacts.value[i].id)
    }
    stepsManagementState.value = stepsManagementState.value.filter((stepInArray) => stepInArray.funnelId != funnelId )
  }

  const deleteStep = (stepPayload) => {
    const toastManagement = toastManagementStore()
    if (!stepPayload) {
      toastManagement.errorToast('An Error Ocurred while Deleting! Try Again')
      return
    }
    contactsStore.deleteCascadeContacts(stepPayload)
    const stepsFromFunnel = stepsManagementState.value.filter((stepInState) => stepInState.funnelId == stepPayload.funnelId)
    stepsFromFunnel.forEach((stepInArray) => {
      if (stepInArray.stepPostion > stepPayload.stepPostion) {
        const index = stepsManagementState.value.findIndex((stepInState) => stepInState.id == stepInArray.id)
        stepsManagementState.value[index].stepPostion--
      }
    })
    stepsManagementState.value = stepsManagementState.value.filter((StepInArray) => StepInArray.id != stepPayload.id)
    toastManagement.succesToast('Step Deleted with Success!')
  }

  const createStep = (newStepPayload) => {
    const toastManagement = toastManagementStore()
    if (!newStepPayload.value.name) {
      toastManagement.errorToast('Inser a Valid Name')
      return
    }

    const stepsToOrder = stepsManagementState.value.filter((stepInArray) => stepInArray.funnelId == newStepPayload.value.funnelId)
    stepsToOrder.forEach((stepInArray) => {
      const index = stepsManagementState.value.findIndex((stepInState) => stepInState.id == stepInArray.id)
      stepsManagementState.value[index].stepPostion++
    })

    const newStep = ref(newStepPayload.value)

    const id = getterSteps.value.length == 0 ? 1 : getterSteps.value[getterSteps.value.length - 1].id + 1

    newStep.value = {
      ...newStep.value,
      id: id,
      stepPostion: 0
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
      stepsManagementState.value.push(payload.value)
    }

  }


  return { findSuccessStepsFromFunnel ,findRejectedStepFromFunnel ,percentageByFunnelReport ,filterFunnelProfit ,orderSteps ,getSteps, editStep, deleteStep, stepsManagementState, createStep, createStepsForDefaultFunnel, deleteStepOnCascade, isFunnelEmpty }
},   { persist: true } )
