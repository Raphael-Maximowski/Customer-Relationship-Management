import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const reportsModule = defineStore(
  'reports',
  () => {

    const reportToShow = ref({})

    const reportData = computed(() => reportToShow.value)

    const setReportData = (reportToSet) => {
      reportToShow.value = reportToSet

      console.log("State: ", reportToShow.value)
    }
    return {
      reportData,
      setReportData
    }
  }
)
