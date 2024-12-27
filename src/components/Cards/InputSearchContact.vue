<script setup>
import { useRouter } from 'vue-router'


const router = useRouter()
const props = defineProps({
  funnelData: { type: Object, required: true }
})

const routeToStep = () => {
  router.push({ name:  'CRMStepsView', params: { id: props.funnelData.id } })
}


</script>

<template>
  <div @click="routeToStep" class="text-primary funnel-return fs-6 w-100 my-1 d-flex align-items-center">
    <i class="me-3 bi bi-funnel-fill"></i>
    <p class="m-0"> {{ funnelData.name }} </p>
  </div>
</template>

<style>
.funnel-return {
  cursor: pointer;
}
</style>
