<script setup>
import ReturnFormButton from '@/components/Buttons/returnFormButton.vue'
import { funnelsManagementStore } from '@/stores/funnelsManagement.js'
import { nextTick, onMounted, ref } from 'vue'
import Chart from 'chart.js/auto';

const funnelStore = funnelsManagementStore()
const funnelsReportData = ref([])
const chartInstance = ref(null)
const canvasRef = ref(null)

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

const getReportsData = () => {
  funnelsReportData.value = funnelStore.totalRejectionFromFunnels()
  console.log("Data Return: ", funnelsReportData.value)

  data.value.labels = funnelsReportData.value.labels
  data.value.datasets[0].data = funnelsReportData.value.rejectedContacts
}

 onMounted( async () => {
   await getReportsData()
   await nextTick();
   chartInstance.value = new Chart(canvasRef.value, config);
 })

</script>

<template>
  <div class="w-100 h-100 flex-column d-flex">
    <div >
      <div class="d-flex align-items-center">
        <div>
          <ReturnFormButton />
        </div>
        <p class="m-0 fw-bold fs-5">Rejection Rate from Funnels</p>
      </div>

      <p class="ms-5">The values shown below are based in the 'Rejected' columns from each funnel</p>
    </div>
    <div class="flex-grow-1 mt-4 mb-5 d-flex align-items-center justify-content-center">
      <div class="graph-container">
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
    width: 35%;
  }
}

@media(max-width: 1700px) {
  .graph-container  {
    width: 40%;
  }
}

@media(max-width: 1500px) {
  .graph-container  {
    width: 45%;
  }
}

@media(max-width: 1300px) {
  .graph-container  {
    width: 53%;
  }
}

@media(max-width: 1100px) {
  .graph-container  {
    width: 60%;
  }
}

@media(max-width: 700px) {
  .graph-container  {
    width: 70%;
  }
}

@media(max-width: 500px) {
  .graph-container  {
    width: 90%;
  }
}
</style>
