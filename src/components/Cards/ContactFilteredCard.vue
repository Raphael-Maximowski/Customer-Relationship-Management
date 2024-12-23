<script setup>

import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  contact: { type: Object, required: true }
})

const routeToFunnel = () => {
  router.push({ name: 'CRMStepsView', params: { id: props.contact.funnelId } })
}

</script>

<template>
  <div @click="routeToFunnel" class="contact-filtered d-flex rounded-3  align-items-center position-relative">
    <div class="d-flex align-items-center justify-content-center h-100 code-section bg-primary">
      <p class="m-0 text-white fw-bold">{{ contact.id }}</p>
    </div>
    <div class="d-flex justify-content-between card-body">
      <p class="mb-0 ms-4 text-primary "> {{ contact.name }} </p>
    </div>
    <i
      style="right: 10px"
      class="text-primary fs-4 position-absolute bi bi-chevron-compact-right"></i>
  </div>
</template>

<style>
.contact-filtered {
  cursor: pointer;
  border: 1px solid #0D6EFD;
  height: 70px;
  transition: 0.5s;
}

.code-section {
  min-width: 60px;
}
</style>
