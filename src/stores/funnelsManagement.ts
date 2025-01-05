import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { toastManagementStore } from '@/stores/toastManagement.ts'
import { stepsManagementStore } from '@/stores/stepsManagement.ts'


export const funnelsManagementStore = defineStore('funnelsManagement', () => {
  const toastManagement = toastManagementStore()
  const stepsStore = stepsManagementStore()

  const funnelsData = ref([
    { name: 'Funnel Example', description: 'Created as a Example', id: 1, date: '10/09/2024' }
    ]
  )

  const totalSuccesFromFunnels = () => {
    const funnelsLabels = []
    const succedContactsInFunnel = []

    funnelsData.value.forEach((funnelInState) => {
      const succesContactsInStep = stepsStore.findSuccessStepsFromFunnel(funnelInState.id)
      funnelsLabels.push(funnelInState.name)
      succedContactsInFunnel.push(succesContactsInStep)
    })

    const payload = {
      labels: funnelsLabels,
      succesContacts: succedContactsInFunnel
    }

    return payload
  }

  const totalRejectionFromFunnels = () => {
    const funnelsLabels = []
    const rejectedContactsInFunnel = []
    funnelsData.value.forEach((funnelInState) => {
      const rejectedContactsInStep = stepsStore.findRejectedStepFromFunnel(funnelInState.id)
      if (rejectedContactsInStep > 0) {
        funnelsLabels.push(funnelInState.name)
        rejectedContactsInFunnel.push(rejectedContactsInStep)
      }
    })

    const payload = {
      labels: funnelsLabels,
      rejectedContacts: rejectedContactsInFunnel
    }

    return payload
  }

  const filterReports = () => {
    return stepsStore.filterFunnelProfit(funnelsData.value)
  }

  const favoriteFunnels = computed(() => funnelsData.value.filter((funnelInArray) => funnelInArray.favorite ==  true))

  const handleFunnelFavoriteState = (funnelPayload) => {
    const index = funnelsData.value.findIndex((funnelInArray) => funnelInArray.id == funnelPayload.id)
    funnelsData.value[index].favorite = !funnelPayload.favorite
    toastManagement.succesToast("Funnel Favorite State Updated!")
  }

  const funnelsDataGetter = computed(() => funnelsData.value)

  const duplicateFunnel = (funnelToDuplicate) => {

    if (!funnelToDuplicate) {
      toastManagement.errorToast('An error occurred while duplicating, try again later')
      return
    }

    const funnelToPush = ref({})
    let created_at = new Date()

    function formatDate(date) {
      const month = date.getMonth() + 1
      const day = date.getDate()
      const year = date.getFullYear()

      return `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`
    }

    const name = funnelToDuplicate.name
    const description = funnelToDuplicate.description
    const id = funnelsData.value.length == 0 ? 1 : funnelsData.value[funnelsData.value.length - 1].id + 1
    created_at = formatDate(created_at)

    funnelToPush.value.name = name
    funnelToPush.value.id = id
    funnelToPush.value.description = description
    funnelToPush.value.date = created_at
    funnelToPush.value.favorite = false

    funnelsData.value.push(funnelToPush.value)
    stepsStore.createStepsForDefaultFunnel(funnelToPush.value.id)
  }

  const editFunnel = (funnelEditData) => {
    const index = funnelsData.value.findIndex((funnelInArray) => funnelInArray.id == funnelEditData.id)
    if (index > -1) {
      funnelsData.value[index] = funnelEditData
      toastManagement.succesToast('Funnel Edited')

      return
    }

    toastManagement.errorToast('An error occurred while editing, try again later')
  }

  const deleteFunnel = (funnelToDelete) => {
    const index = funnelsData.value.findIndex((funnelInArray) => funnelInArray.id == funnelToDelete.id)
    if (index > -1) {
      funnelsData.value.splice(index, 1)
      stepsStore.deleteStepOnCascade(funnelToDelete.id)
      toastManagement.succesToast('Funnel Deleted')
      return
    }

    toastManagement.errorToast('An error occurred while deleting, try again later')
  }

  const createFunnel = (funnelData) => {
    if (!funnelData) return
    let funnel = funnelData
    const funnelId = funnelsData.value.length == 0 ? 1 : funnelsData.value[funnelsData.value.length - 1].id + 1
    let created_at = new Date()

    function formatDate(date) {
      const month = date.getMonth() + 1
      const day = date.getDate()
      const year = date.getFullYear()

      return `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`
    }

    created_at = formatDate(created_at)

    funnel = {
      ...funnel,
      id: funnelId,
      date: created_at,
      favorite: false
    }

    funnelsData.value.push(funnel)
    stepsStore.createStepsForDefaultFunnel(funnel.id)
  }

  return { totalSuccesFromFunnels ,totalRejectionFromFunnels ,filterReports ,favoriteFunnels ,handleFunnelFavoriteState ,funnelsDataGetter, funnelsData, createFunnel, deleteFunnel, editFunnel, duplicateFunnel }
}, { persist: true })
