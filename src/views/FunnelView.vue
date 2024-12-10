<script setup lang="ts">

import FunnelCard from '@/components/Cards/funnelCard.vue'
import { computed } from 'vue'
import { funnelsManagementStore } from '@/stores/funnelsManagement.ts'
import CreateOrUpdateFunnel from '@/components/Modals/CreateOrUpdateFunnel.vue'

const funnelsStore = funnelsManagementStore()
const funnelsData = computed(() => funnelsStore.funnelsDataGetter)

</script>
<template>
  <div class="w-100 h-100 ">
    <div class="cards-container mx-5 my-3 d-flex flex-wrap">
      <FunnelCard
        :style="{
        flex: userConfigWidth < 700 ? '1 1 calc(100% - 16px)' : userConfigWidth < 1300 ? '1 1 calc(50% - 50px)' : '1 1 calc(33.3% - 50px)',
        maxWidth: userConfigWidth < 700 ? '100%' : userConfigWidth < 1300 ? '49%' : '32.5%'
      }"
        class="funnel-card"
        v-for="funnelData in funnelsData"
        :key="funnelData.id"
        :funnelData="funnelData"
      />
    </div>
    <CreateOrUpdateFunnel :modalState="modalState" />
  </div>
</template>

<style>
.cards-container {
  gap: 16px;
}

.funnel-card {
  flex: 1 1 calc(50% - 16px);
}
</style>
