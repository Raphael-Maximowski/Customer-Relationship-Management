import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { toastManagementStore } from '@/stores/toastManagement.ts'

export const userConfigStore = defineStore('userConfig', () => {
    const userConfig = ref({
      viewPortWidth: 0,
      color: {
        color: 'bg-primary',
        name: 'Blue',
        btn: 'btn-primary',
        emptyBtn: 'btn-outline-primary',
        hexa: '#0D6EFD',
        text: 'text-primary',
        textName: 'Blue'
      },
      userName: 'User',
      messageToSend: '',
    })

    const userColorData = computed(() => userConfig.value.color)
    const userMessageToSend = computed(() => userConfig.value.messageToSend)
    const userName = computed(() => userConfig.value.userName)
    const userWidth = computed(() => userConfig.value.viewPortWidth)

    const setMessageToSend = (newDescription) => {
      userConfig.value.messageToSend = newDescription
    }

    const setUserName = (newName) => {
      const toastStore = toastManagementStore()
      if (!newName) {
        toastStore.errorToast('Insert a Valid Name!')
        return
      }
      userConfig.value.userName = newName
    }

    const setUserviewPortWith = (viewPort) => {
      userConfig.value.viewPortWidth = viewPort
    }

    const setUserColors = (colorsData) => {
      const colorsKeys = Object.keys(colorsData)
      colorsKeys.forEach((KeyInArray) => {
        userConfig.value.color[KeyInArray] = colorsData[KeyInArray]
      })
    }

    return {
      userConfig,
      userColorData,
      setMessageToSend,
      userMessageToSend,
      userName,
      setUserName,
      setUserColors,
      setUserviewPortWith,
      userWidth
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          key: 'userConfig', // Nome da chave no localStorage
          storage: localStorage // Tipo de armazenamento
        }
      ]
    }
  })
