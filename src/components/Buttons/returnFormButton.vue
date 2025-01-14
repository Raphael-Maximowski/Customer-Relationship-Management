<script setup>

import { useRouter } from 'vue-router'
import { userConfigStore } from '@/stores/userConfigManagement.ts'
import { computed, onMounted } from 'vue'
import { userColorInterface } from '@/types/userConfig.ts'

const router = useRouter()
const userStore = userConfigStore()
const userColorData = computed<userColorInterface>(() => userStore.userColorData);

const redirectToMainPage = () => {
  router.push({ name: 'ReportsView' })
}

onMounted(() => {
  console.log("UserColor: ", userColorData.value)
})

</script>

<template>
  <button class="bg-transparent border-0 me-2">
    <i @click="redirectToMainPage" :class="['bi bi-arrow-return-left  py-2 px-2 text-white rounded-4', userColorData.color]"></i>
  </button>
</template>

<style scoped>

</style>
