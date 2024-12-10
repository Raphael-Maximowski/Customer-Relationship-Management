<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import Sidebar from '@/components/SideBars/Sidebar.vue'
import { userConfigStore } from '@/stores/userConfig.ts'
import { computed, onMounted, onUnmounted, watch } from 'vue'
import { buttonsManagementStore } from '@/stores/buttonsManagement.ts'
import CreateOrUpdateFunnel from '@/components/Modals/CreateOrUpdateFunnel.vue'
import Header from '@/components/Headers/Header.vue'

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
    case 'CRMStepsView':
      buttonsManagement.handleButtonState('Create Contact')
  }
})

</script>

<template>
  <div class="d-flex vw-100 vh-100">
    <Sidebar v-if="userConfigWidth > 992" />
    <div class="flex-grow-1 flex-1 d-flex overflow-x-auto flex-column body-content">
      <Header />
      <RouterView />
    </div>
  </div>

</template>

<style scoped>
.body-content {
  background-color: #EBEBEB;
  max-width: 100%;
}
</style>
