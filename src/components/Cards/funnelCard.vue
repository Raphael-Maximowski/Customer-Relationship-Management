<script setup>

import { onMounted } from 'vue'

const props = defineProps({
  funnelData: { type: Object, required: true }
})

onMounted(() => {
  console.log("Funnels Data: ", props.funnelData)
})

</script>

<template>
  <div class="card bg-primary rounded-3 text-white">
    <div class="card-body">
      <div class="">
        <div class="d-flex mx-1 align-items-center justify-content-between ">
          <h4 class="fs-6 fw-bold m-0">{{ funnelData.name }}</h4>
          <p class="fs-6 fw-bold m-0">Code: {{ funnelData.id }}</p>
        </div>
        <div class="my-2 d-flex align-items-center justify-content-between ">
          <button class="bg-transparent border-0"><i class="bi py-1 px-2 rounded-2 text-white button-option bi-plus-lg"></i></button>
          <button class="bg-transparent border-0"><i class="bi py-1 px-2 rounded-2 text-white button-option bi-three-dots"></i></button>
        </div>
      </div>
      <div class="mx-1 pt-4 pb-2">
        <p class="m-0 fs-6"> {{ funnelData.description }} </p>
        <p class="text-end m-0">{{ funnelData.date }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.button-option {
  background-color: #59A9FF;
}

p {
  color: #EBEBEB;
}

.card {
  cursor: pointer;
}
</style>
