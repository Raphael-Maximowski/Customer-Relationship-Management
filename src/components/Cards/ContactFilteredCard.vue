<script setup>
import { useRouter } from 'vue-router'
import { userConfigStore } from '@/stores/userConfigManagement.js'
import { computed } from 'vue'

const router = useRouter()
const props = defineProps({
  contact: { type: Object, required: true }
})
const userStore = userConfigStore()
const userColorData = computed(() => userStore.userColorData)

const routeToFunnel = () => {
  router.push({ name: 'CRMStepsView', params: { id: props.contact.funnelId } })
}

</script>

<template>
  <div @click="routeToFunnel" class="contact-filtered d-flex rounded-3  align-items-center position-relative">
    <div :class="['d-flex align-items-center justify-content-center h-100 code-section', userColorData.color]">
      <p class="m-0 text-white fw-bold">{{ contact.id }}</p>
    </div>
    <div class="d-flex justify-content-between card-body">
      <p :class="['mb-0 ms-4', userColorData.text]"> {{ contact.name }} </p>
    </div>
    <i
      style="right: 10px"
      :class="['fs-4 position-absolute bi bi-chevron-compact-right', userColorData.text]"></i>
  </div>
</template>

<style>
.contact-filtered {
  cursor: pointer;
  border: 1px solid var(--dynamic-color);
  height: 70px;
  transition: 0.5s;
}

.code-section {
  min-width: 60px;
}
</style>
