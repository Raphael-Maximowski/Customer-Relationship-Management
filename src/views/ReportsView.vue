<script setup>

import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { RouterView } from 'vue-router'
import { reportsModule } from '@/stores/reportsModule.ts'

const router = useRouter()
const route = useRoute()
const reportStore = reportsModule()
const reportData = computed(() => reportStore.reportData)
const redirectToReports = ref([
  { name: 'Sales by Period - Line Chart', redirect: 'Sales By Period' },
  { name: 'Profit by Funnels - Bar Chart', redirect: 'Profit By Funnels Bar' },
  { name: 'Profit by Funnels - Line Chart', redirect: 'Profit By Funnels Line' },
  { name: 'Percentage by Funnel - Doughnut Chart', redirect: 'Percentage By Funnel' },
  { name: 'Total Rejection - Doughnut Chart', redirect: 'Total Rejection' },
  { name: 'Full Approval - Doughnut Chart', redirect: 'Full Approval' }
])

const redirectToReport = (reportToRedirect) => {
  reportStore.setReportData(reportToRedirect)
  router.push({ name: reportToRedirect.redirect })
}

onMounted(() => {
  reportStore.setReportData('')
})

watch(route, (newRoute) => {
  if (newRoute.name === 'ReportsView') {
    reportStore.setReportData('')
  }
})
</script>

<template>
  <div class="w-100 h-100 d-flex">
    <div class=" mx-5 w-100">
      <div
        v-if="!reportData"
        @click="redirectToReport(report)"
        v-for="report in redirectToReports"
        :key="report.name"
        class="redirect-card w-100 px-4 my-3 py-3 rounded-2 bg-white d-flex align-items-center justify-content-between"
      >
        <p class="m-0 fw-bold"> {{ report.name }} </p>
        <i class="bi bi-chevron-compact-right"></i>
      </div>
      <div v-if="reportData">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped>
.redirect-card {
  cursor: pointer;
}
</style>
