import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'

export const buttonsManagementStore = defineStore('buttonsManagement', () => {
  const buttonState = reactive({
    message: ''
  })

  const buttonData = computed(() => buttonState.message)

  const handleButtonState = (buttonMessage) => {
    buttonState.message = buttonMessage
  }

  return { handleButtonState, buttonData }
})
