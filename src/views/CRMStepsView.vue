<script setup>
import StepsCard from '@/components/Cards/StepCard.vue'
import CreateStepCard from '@/components/Cards/CreateStepCard.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { stepsManagementStore } from '@/stores/stepsManagement.ts'
import CreateOrUpdateContact from '@/components/Modals/CreateOrUpdateContact.vue'
import draggable from 'vuedraggable'

const route = useRoute()
const stepsStore = stepsManagementStore()
const stepsData = computed(() =>
  stepsStore.getSteps(route.params.id)
)

const log = (evt) => {
  stepsStore.orderSteps(evt)
}

</script>

<template>
  <div class="d-flex overflow-x-auto h-100 py-5">
    <CreateStepCard />

    <draggable
      v-model="stepsData"
      tag="div"
      class="d-flex"
      handle=".steps-header"
      @change="event=> log(event)"
    >
      <template  #item="{element}">
        <StepsCard
          :stepInfo="element" />
      </template>
    </draggable>
  </div>

  <CreateOrUpdateContact />
</template>

<style scoped>
.crm-content {
  max-width: 50%;
}
</style>
