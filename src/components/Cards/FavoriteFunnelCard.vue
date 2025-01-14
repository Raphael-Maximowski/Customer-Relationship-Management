<script setup>
import { funnelsManagementStore } from '@/stores/funnelsManagement.ts'
import { userConfigStore } from '@/stores/userConfigManagement.ts'
import { useRouter } from 'vue-router'

const userStore = userConfigStore()
const userWidth = userStore.userWidth
const userColorData = userStore.userColorData
const funnelStore = funnelsManagementStore()
const router = useRouter()
const props = defineProps({
  funnel: { type: Object, required: true }
})

const redirectToFunnel = () => {
  router.push({ name: 'CRMStepsView', params: { id: props.funnel.id } })
}

const changeFavoriteFunnelState = () => {
  funnelStore.handleFunnelFavoriteState(props.funnel)
}
</script>

<template>
  <div @click="redirectToFunnel" :class="['list-item mt-3 w-100 d-flex align-items-center justify-content-between py-2 px-3 rounded-2', userColorData.text]">
    <div class="d-flex align-items-center">
      <i class="bi fs-5 me-3 bi-funnel-fill"></i>
      <p class="m-0"> {{ funnel.name.length > 15 && userWidth < 420 ? funnel.name.slice(0, 13) + '...'  : funnel.name }} </p>
    </div>
    <i @click.stop="changeFavoriteFunnelState" class="bi bi-x-lg"></i>
  </div>
</template>

<style scoped>
.list-item {
  border: 1px dashed var(--dynamic-color);
  cursor: pointer;
}
</style>
