import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'

export const userConfigStore = defineStore('userConfig', () => {
  const userConfig = reactive({
    viewPortWidth: 0,
    color: 'bg-primary'
  })

  const userWidth = computed(() => userConfig.viewPortWidth)

  const setUserviewPortWith = (viewPort) => {
    userConfig.viewPortWidth =  viewPort
  }

  const setUserColor = (color) => {
    userConfig.color = color
  }

  return { setUserColor, setUserviewPortWith, userWidth }
})
