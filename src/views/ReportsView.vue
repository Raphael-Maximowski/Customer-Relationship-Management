<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { RouterView } from 'vue-router'
import { reportsModule } from '@/stores/reportsModule.js'
import { userConfigStore } from '@/stores/userConfigManagement.js'
import { toastManagementStore } from '@/stores/toastManagement.js'

const router = useRouter()
const toastStore = toastManagementStore()
const route = useRoute()
const userStore = userConfigStore()
const userColorData = computed(() => userStore.userColorData)
const reportStore = reportsModule()
const reportData = computed(() => reportStore.reportData)
const redirectToReports = ref([
  { name: 'Profit from Funnels', icon: 'bi bi-bar-chart-fill' ,redirect: 'Profit By Funnels Bar', shouldBlock: false },
  { name: 'Percentage by Funnel', icon: 'bi bi-pie-chart-fill' ,redirect: 'Percentage By Funnel', shouldBlock: false },
  { name: 'Rejection Rate from Funnels', icon: 'bi bi-pie-chart-fill', redirect: 'Total Rejection', shouldBlock: false },
  { name: 'Approval Rate from Funnels', icon: 'bi bi-pie-chart-fill', redirect: 'Full Approval', shouldBlock: false },
  { name: 'Sales By Period', icon: 'bi bi-graph-up', redirect: 'Sales By Period', shouldBlock: true },
  { name: 'Profit from Funnels', icon: 'bi bi-graph-up',redirect: 'Profit By Funnels Line', shouldBlock: true }
])

const redirectToReport = (reportToRedirect) => {
  reportStore.setReportData(reportToRedirect)
  router.push({ name: reportToRedirect.redirect })
}

const toastNotify = () => {
  toastStore.infoToast("In Development!")
}

onMounted(() => {
  reportStore.setReportData('')
})

watch(route, (newRoute) => {
  if (newRoute.name == 'ReportsView') {
    reportStore.setReportData('')
  }
})
</script>

<template>
  <div class="w-100 h-100 d-flex">
    <div class=" mx-5 w-100 h-100">
      <div
        v-if="!reportData"
        @click="report.shouldBlock ? toastNotify() : redirectToReport(report)"
        v-for="report in redirectToReports"
        :key="report.name"
        :class="['redirect-card w-100 px-4 my-3 py-3 rounded-2 bg-white d-flex align-items-center justify-content-between']"
      >
        <div class="d-flex fs-6">
          <i :class="[report.icon, userColorData.text]"></i>
          <p class="ms-4 m-0 "> {{ report.name }} </p>
        </div>

        <i :class="['bi bi-chevron-compact-right']"> </i>
      </div>
      <div v-if="reportData" class="h-100">
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
