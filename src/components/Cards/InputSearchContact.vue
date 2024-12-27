<script setup>
import { useRouter } from 'vue-router'
import { userConfigStore } from '@/stores/userConfigManagement.ts'


const router = useRouter()
const userStore = userConfigStore()
const userColorData = userStore.userColorData
const props = defineProps({
  funnelData: { type: Object, required: true }
})

const routeToStep = () => {
  router.push({ name:  'CRMStepsView', params: { id: props.funnelData.id } })
}


</script>

<template>
  <div @click="routeToStep" :class="['funnel-return fs-6 w-100 my-1 d-flex align-items-center', userColorData.text]">
    <i class="me-3 bi bi-funnel-fill"></i>
    <p class="m-0"> {{ funnelData.name }} </p>
  </div>
</template>

<style>
.funnel-return {
  cursor: pointer;
}
</style>
