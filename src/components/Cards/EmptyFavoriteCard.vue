<script setup>
import { userConfigStore } from '@/stores/userConfigManagement.ts'

const userStore = userConfigStore()
const userColorData = userStore.userColorData
</script>

<template>
  <div :class="['empty-container w-100 px-3 py-2 rounded-2 mt-3 d-flex  justify-content-center align-items-center', userColorData.text]">
    <i class="bi fs-5 bi-clipboard2-minus-fill"></i>
    <p class="m-0 mx-4 fw-bold">Nothing Was Found</p>
  </div>
</template>

<style scoped>
.empty-container {
  border: 2px dashed var(--dynamic-color);
}
</style>
