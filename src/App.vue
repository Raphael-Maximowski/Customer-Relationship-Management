<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import Sidebar from '@/components/SideBars/Sidebar.vue'
import { userConfigStore } from '@/stores/userConfigManagement.ts'
import { computed, onMounted, onUnmounted, watch } from 'vue'
import Header from '@/components/Headers/Header.vue'
import { headerManagementStore } from '@/stores/headerManagement.ts'
import { stepsManagementStore } from '@/stores/stepsManagement.ts'

const userConfig = userConfigStore()
const stepStore = stepsManagementStore()
const headerStore = headerManagementStore()
const userConfigWidth = computed(() => userConfig.userWidth)
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
      headerStore.setHeaderData({ buttonMessage: 'Create Funnel', headerMessage: 'Scope your Clients however you want!', action: 'Create Funnel', inputMessage: 'Search For Funnels', searchType: 'Funnel' })
      break;
    case 'CRMStepsView':
      headerStore.setHeaderData({ buttonMessage: 'Create Contact', headerMessage: 'Have a better management of your Clients!', action: 'Create Contact', inputMessage: 'Search For Contacts', searchType: 'Contacts' })
      break;
    case 'ContactsListView':
      headerStore.setHeaderData({ buttonMessage: '', headerMessage: 'Filter your Contacts!', action: 'Create Contact', inputMessage: '', searchType: '' })
      break;
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
