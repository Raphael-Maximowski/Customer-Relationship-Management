<script setup>
import ReturnFormButton from '@/components/Buttons/returnFormButton.vue'
import Chart from 'chart.js/auto';
import { nextTick, onMounted, ref, watch } from 'vue'
import { funnelsManagementStore } from '@/stores/funnelsManagement.js'
import { stepsManagementStore } from '@/stores/stepsManagement.js'

const funnelsStore = funnelsManagementStore()
const stepsStore = stepsManagementStore()
const funnelsData = funnelsStore.funnelsDataGetter
const existsFunnels = ref(true)
const funnelToSearch = ref('')
const funnelsReportData = ref({});
const chartInstance = ref(null)
const canvasRef = ref(null)
const isFunnelEmpty = ref(false)

const data = ref({
  labels: [],
  datasets: [
    {
      data: [],
    }
  ]
})

const config = {
  type: 'doughnut',
  data: data.value,
  options: {
    responsive: true,
  },
};

const getFunnelData = () => {
  funnelsReportData.value = stepsStore.percentageByFunnelReport(funnelToSearch.value.id)
  data.value.labels = funnelsReportData.value.labels
  data.value.datasets[0].data = funnelsReportData.value.contactsData


  if (chartInstance.value) {
    chartInstance.value.destroy();
  }

  chartInstance.value = new Chart(canvasRef.value, config);
}

watch(funnelToSearch, () => {
  getFunnelData()
}, { deep: true })

onMounted(async () => {
  if (funnelsData.length == 0) {
    existsFunnels.value = false;
    return;
  }

  funnelToSearch.value = funnelsData[0];

  await nextTick();
  chartInstance.value = new Chart(canvasRef.value, config);
})

</script>

<template>
  <div class="w-100  h-100 flex-column d-flex">
    <div >
      <div class="d-flex align-items-center">
        <div>
          <ReturnFormButton />
        </div>
        <p class="m-0 fw-bold fs-5">Percentage From Funnel</p>
      </div>

      <p class="ms-5">Choose a funnel to check how the steps are filled</p>
    </div>
    <div class="flex-column flex-grow-1 mb-5 d-flex align-items-center justify-content-center">
      <div class="col-md-3 col-8">
        <label class="fw-bold mb-2">Select a Funnel</label>
        <select
          v-model="funnelToSearch"
          class="form-select w-100 mb-4">
          <option
            v-for="funnel in funnelsData"
            :key="funnel.id"
            :value="funnel"
          >
            {{ funnel.name }}
          </option>
        </select>
      </div>
      <div v-if="!isFunnelEmpty" class="graph-container">
        <canvas ref="canvasRef"></canvas>
      </div>

    </div>
  </div>
</template>

<style scoped>

.graph-container  {
  width: 25%;
}

@media(max-width: 2000px) {
  .graph-container  {
    width: 30%;
  }
}

@media(max-width: 1700px) {
  .graph-container  {
    width: 35%;
  }
}

@media(max-width: 1500px) {
  .graph-container  {
    width: 40%;
  }
}

@media(max-width: 1300px) {
  .graph-container  {
    width: 48%;
  }
}

@media(max-width: 1100px) {
  .graph-container  {
    width: 55%;
  }
}

@media(max-width: 700px) {
  .graph-container  {
    width: 65%;
  }
}

@media(max-width: 500px) {
  .graph-container  {
    width: 85%;
  }
}
</style>
