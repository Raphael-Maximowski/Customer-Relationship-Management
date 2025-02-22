import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { toastManagementStore } from '@/stores/toastManagement.js'

export const userConfigStore = defineStore('userConfig', () => {
    const userConfig = ref({
      viewPortWidth: 0,
      color: {
        color: 'bg-dark',
        name: 'Dark',
        btn: 'btn-dark',
        emptyBtn: 'btn-outline-dark',
        hexa: '#212529',
        text: 'text-dark',
        textName: 'Dark'
      },
      userName: 'User',
      messageToSend: '',
    })

    const userColorData = computed(() => userConfig.value.color)
    const userMessageToSend = computed(() => userConfig.value.messageToSend)
    const userName = computed(() => userConfig.value.userName)
    const userWidth = computed(() => userConfig.value.viewPortWidth)

    const setMessageToSend = (newDescription) => {
      const toastStore = toastManagementStore()
      if (!newDescription) {
        toastStore.errorToast("Inser a Valid Message")
        return
      }


      userConfig.value.messageToSend = newDescription
      toastStore.succesToast("Message Changed!")
    }

    const setUserName = (newName) => {
      const toastStore = toastManagementStore()
      if (!newName) {
        toastStore.errorToast('Insert a Valid Name!')
        return
      }
      userConfig.value.userName = newName
      toastStore.succesToast('User name Changed!')
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
  }, { persist: true })
