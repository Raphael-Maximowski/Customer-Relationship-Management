<script setup>

import { useRouter } from 'vue-router'

const router = useRouter()

const redirectToMainPage = () => {
  router.push({ name: 'ReportsView' })
}

</script>

<template>
  <button class="bg-transparent border-0 me-3">
    <i @click="redirectToMainPage" class="bi bi-arrow-return-left bg-dark py-2 px-2 text-white rounded-4"></i>
  </button>
</template>

<style scoped>

</style>
