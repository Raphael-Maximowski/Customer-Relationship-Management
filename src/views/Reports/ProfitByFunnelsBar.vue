<script setup>
import ReturnFormButton from '@/components/Buttons/returnFormButton.vue'
import Chart from 'chart.js/auto';
import { onMounted } from 'vue'
import { funnelsManagementStore } from '@/stores/funnelsManagement.js'

const funnelStore = funnelsManagementStore()
const reportData = funnelStore.filterReports()

const labels = reportData.funnels
const data = {
  labels: labels,
  datasets: [{
    label: 'Valid Funnels',
    data: reportData.values,
    borderWidth: 1
  }]
};

const config = {
  type: 'bar',
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  },
};

onMounted(async () => {
  const myChart = new Chart(
    document.getElementById("myChart"),
    config
  )
})
</script>

<template>
  <div class="w-100 h-100 flex-column d-flex">
    <div >
      <div class="d-flex align-items-center">
        <div>
          <ReturnFormButton />
        </div>
        <p class="m-0 fw-bold fs-5">Profit By Funnels</p>
      </div>

      <p class="ms-5">The values shown below are based in the 'Accepted' columns from each funnel</p>
    </div>
    <div class="flex-grow-1 mt-4 mb-5 d-flex align-items-center justify-content-center">
      <div class="graph-container">
        <canvas id="myChart"></canvas>
      </div>

    </div>
  </div>
</template>

<style scoped>
.graph-container  {
  width: 50%;
  max-width: 100%;
  overflow-x: auto;
}

@media(max-width: 2000px) {
  .graph-container  {
    width: 60%;
  }
}

@media(max-width: 1700px) {
  .graph-container  {
    width: 65%;
  }
}

@media(max-width: 1500px) {
  .graph-container  {
    width: 70%;
  }
}

@media(max-width: 1300px) {
  .graph-container  {
    width: 85%;
  }
}

@media(max-width: 1100px) {
  .graph-container  {
    width: 100%;
  }
}

</style>
