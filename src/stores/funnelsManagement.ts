import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { toastManagementStore } from '@/stores/toastManagement.ts'
const toastManagement = toastManagementStore()

export const funnelsManagementStore = defineStore('funnelsManagement', () => {
  const funnelsData = reactive({
    funnelsInArray: [
      { name: 'Funnel Example', description: 'Created as a Example', id: 1, date: '10/09/2024' },
      { name: 'Teste1', description: 'OLA OLA OLA OLA', id: 2, date: '10/09/2024' },
    ]
  })

  const funnelsDataGetter = computed(() => funnelsData.funnelsInArray)

  const duplicateFunnel = (funnelToDuplicate) => {
    if (!funnelToDuplicate) {
      toastManagement.errorToast("An error occurred while duplicating, try again later")
      return
    }

    const funnelToPush = ref({})
    let created_at = new Date();

    function formatDate(date) {
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();

      return `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
    }

    const name = funnelToDuplicate.name
    const description = funnelToDuplicate.description
    const id = funnelsData.funnelsInArray.length + 1
    created_at = formatDate(created_at)

    funnelToPush.value.name = name
    funnelToPush.value.id = id
    funnelToPush.value.description = description
    funnelToPush.value.date = created_at

    funnelsData.funnelsInArray.push(funnelToPush.value)
  }

  const editFunnel = (funnelEditData) => {
    const index = funnelsData.funnelsInArray.findIndex((funnelInArray) => funnelInArray.id === funnelEditData.id)
    if (index > -1) {
      funnelsData.funnelsInArray[index] = funnelEditData
      toastManagement.succesToast("Funnel Edited")

      return
    }

    toastManagement.errorToast("An error occurred while editing, try again later")
  }

  const deleteFunnel = (funnelToDelete) => {
    const index = funnelsData.funnelsInArray.findIndex((funnelInArray) => funnelInArray.id === funnelToDelete.id)
    if (index > -1) {
      funnelsData.funnelsInArray.splice(index, 1)
      toastManagement.succesToast("Funnel Deleted")
      return
    }

    toastManagement.errorToast("An error occurred while deleting, try again later")
  }

  const createFunnel = (funnelData) => {
    if (!funnelData) return;
    let funnel = funnelData
    const funnelId = funnelsData.funnelsInArray.length + 1
    let created_at = new Date();

    function formatDate(date) {
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();

      return `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
    }

    created_at = formatDate(created_at)

    funnel = {
      ...funnel,
      id: funnelId,
      date: created_at
    }

    funnelsData.funnelsInArray.push(funnel)
  }

  return { funnelsDataGetter, createFunnel, deleteFunnel, editFunnel, duplicateFunnel }
})
