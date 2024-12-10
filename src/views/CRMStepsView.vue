<script setup>
import StepsCard from '@/components/Cards/StepCard.vue'
import CreateStepCard from '@/components/Cards/CreateStepCard.vue'
import { useRoute } from 'vue-router'
import { computed, onMounted, ref, watch } from 'vue'
import { stepsManagementStore } from '@/stores/stepsManagement.ts'

const route = useRoute()
const stepsStore = stepsManagementStore()
const stepsData = computed(() =>
  stepsStore.getSteps(route.params.id)
);

</script>

<template>
  <div class="d-flex overflow-x-auto h-100 ">
    <CreateStepCard />
    <StepsCard
      v-for="stepInfo in stepsData"
      :stepInfo="stepInfo" />
  </div>
</template>

<style scoped>
.crm-content {
  max-width: 50%;
}
</style>
