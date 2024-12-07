import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'

export const toastManagementStore = defineStore('toastManagement', () => {

  const succesToast = (message) => {
    toast.success(message)
  }

  const errorToast = (message) => {
    toast.error(message)
  }


  return { succesToast, errorToast }
})
