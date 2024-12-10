<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import Sidebar from '@/components/SideBars/Sidebar.vue'
import { userConfigStore } from '@/stores/userConfig.ts'
import { computed, onMounted, onUnmounted, watch } from 'vue'
import { buttonsManagementStore } from '@/stores/ButtonsManagement.ts'
import CreateOrUpdateFunnel from '@/components/Modals/CreateOrUpdateFunnel.vue'

const userConfig = userConfigStore()
const userConfigWidth = computed(() => userConfig.userWidth)
const buttonsManagement = buttonsManagementStore()
const route = useRoute()

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

watch(route, (newRoute) => {
  switch (newRoute.name){
    case 'funnelsView':
      buttonsManagement.handleButtonState('Create Funnel')
      break;
  }
})

</script>

<template>
  <div class="d-flex vh-100 vw-100 flex-column">
    <Sidebar />
    <div class="flex-grow-1 body-content">
      <RouterView v-if="userConfigWidth < 992" />
    </div>
  </div>
</template>

<style scoped>
.body-content {
  background-color: #EBEBEB;
}
</style>
