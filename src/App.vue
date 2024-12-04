<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from '@/components/SideBars/Sidebar.vue'
import { userConfigStore } from '@/stores/userConfig.ts'
import { computed, onMounted, onUnmounted, watch } from 'vue'

const userConfig = userConfigStore()
const userConfigWidth = computed(() => userConfig.userWidth)

const updateUserViewPort = () => {
  userConfig.setUserviewPortWith(window.innerWidth)
}

onMounted(() => {
  window.addEventListener('resize', updateUserViewPort);
  userConfig.setUserviewPortWith(window.innerWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateUserViewPort);
})
</script>

<template>
  <Sidebar />
  <RouterView v-if="userConfigWidth < 992" />
</template>

<style scoped>

</style>
