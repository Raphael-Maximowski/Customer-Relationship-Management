import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { useRoute } from 'vue-router'

export const modalsManagementStore = defineStore('modalsManagement', () => {
  const modalInformation = reactive({
    modalState: false,
    modalView: '',
    editMode: false,
    modalData: {}
  })

  const handleModalState = (modalPayload) => {
     console.log("Modal Payload Received: ", modalPayload)
    if (!modalPayload) {
      modalInformation.modalState = false
      modalInformation.modalView = ''

      return
    }

    switch (modalPayload.action) {
      case 'Create Funnel':
        modalInformation.modalState = true
        modalInformation.modalView = 'CreateOrUpdateFunnel'

        modalPayload.modalData ? modalInformation.modalData = modalPayload.modalData : modalInformation.modalData = {}
        modalPayload.editMode ? modalInformation.editMode = modalPayload.editMode : modalInformation.editMode = false

        console.log("Modal Last STate: ", modalInformation)
        break;
    }
  }

  const modalData = computed(() => modalInformation)

  return { handleModalState, modalData }
})
