import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const headerManagementStore = defineStore('headerManagement', () => {
  const headerDataState = ref({
    buttonMessage: '',
    inputMessage: '',
    headerMessage: '',
    action: '',
    searchType: '',
    mobileHeaderState: false
  })

  const headerDataGetter = computed(() => headerDataState.value)
  const headerMobileStateGetter = computed(() => headerDataState.value.mobileHeaderState)

  const setHeaderMobileState =(state) => {
    headerDataState.value.mobileHeaderState = state
  }

  const setHeaderData = (payload) => {
    headerDataState.value = {
      buttonMessage: payload.buttonMessage,
      headerMessage: payload.headerMessage,
      action: payload.action,
      inputMessage: payload.inputMessage,
      searchType: payload.searchType
    }
  }

  return { setHeaderData, headerDataGetter, setHeaderMobileState, headerMobileStateGetter }
})
