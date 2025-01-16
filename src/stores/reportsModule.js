import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const reportsModule = defineStore(
  'reports',
  () => {

    const reportToShow = ref({})

    const reportData = computed(() => reportToShow.value)

    const setReportData = (reportToSet) => {
      reportToShow.value = reportToSet
    }
    return {
      reportData,
      setReportData
    }
  }
)
