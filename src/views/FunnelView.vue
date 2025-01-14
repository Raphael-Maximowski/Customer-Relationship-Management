<script setup lang="ts">

import FunnelCard from '@/components/Cards/FunnelCard.vue'
import { computed } from 'vue'
import { funnelsManagementStore } from '@/stores/funnelsManagement.ts'
import CreateOrUpdateFunnel from '@/components/Modals/CreateOrUpdateFunnel.vue'
import { userConfigStore } from '@/stores/userConfigManagement.ts'

const funnelsStore = funnelsManagementStore()
const funnelsData = computed(() => funnelsStore.funnelsDataGetter)
const userConfig = userConfigStore()
const userConfigWidth = computed(() => userConfig.userWidth)

</script>
<template>
  <div class="w-100 h-100 ">
    <div class="cards-container px-5 py-5 d-flex flex-wrap">
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
    <CreateOrUpdateFunnel/>
  </div>
</template>

<style scoped>
.cards-container {
  gap: 16px;
}

.funnel-card {
  flex: 1 1 calc(50% - 16px);
}
</style>
