<script setup>
import { userConfigStore } from '@/stores/userConfigManagement.ts'

const userStore = userConfigStore()
const userColorData = userStore.userColorData
</script>

<template>
  <div class="px-4 d-flex align-items-center justify-content-around py-3 contact-container w-100 my-4 rounded-3">
    <i :class="['bi mx-5 bi-folder-x fs-2', userColorData.text]"></i>
    <p :class="['m-0 fs-5 me-5', , userColorData.text]">No contacts were found at this step</p>
  </div>
</template>

<style scoped>
.contact-container {
  min-height: 140px;
  cursor: pointer;
  border: 2px dashed var(--dynamic-color);
  opacity: 0;
  transition: 0.5s;
}

.contact-container:hover {
  opacity: 1;
}

</style>
