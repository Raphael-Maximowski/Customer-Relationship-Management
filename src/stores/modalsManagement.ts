import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'


export const modalsManagementStore = defineStore('modalsManagement', () => {
  const modalInformation = reactive({
    modalState: false,
    modalName: ''
  })

  const handleModalState = (modalData) => {
    if (!modalData) {
      modalInformation.modalState = false
      modalInformation.modalName = ''

      return
    }

    modalInformation.modalState = modalData.state
    modalInformation.modalState = modalData.name

  }

  const modalData = computed(() => modalInformation)

  return { handleModalState, modalData }
})
