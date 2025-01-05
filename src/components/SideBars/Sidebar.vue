<script setup lang="ts">
import { userConfigStore } from '@/stores/userConfigManagement.ts'
import { buttonsManagementStore } from '@/stores/headerManagement.ts'
import { computed, ref } from 'vue'
import { modalsManagementStore } from '@/stores/modalsManagement.ts'
import { useRoute, useRouter } from 'vue-router'

const userConfig = userConfigStore()
const router = useRouter()
const userConfigWidth = computed(() => userConfig.userWidth)
const userColorData = computed(() => userConfig.userColorData)
const sideBarState = ref(false)
const dropUpState = ref(false)

const handleSideBarState = () => {
  sideBarState.value = !sideBarState.value
}

const handleDropUpState = () => {
  dropUpState.value = !dropUpState.value
}

const handleSideBarRoute = (routeToPush) => {
  router.push({ name: routeToPush.routeName })
}

const RouterOptions = [
  {
    name: 'CRM Options',
    icon: 'bi bi-layers-fill',
    id: 1,
    router: [
      {
        name: 'Funnels',
        routeName: 'funnelsView',
        icon: 'bi bi-funnel-fill',
        id: 1
      },
      {
        name: 'Contacts',
        routeName: 'ContactsListView',
        icon: 'bi bi-person-rolodex',
        id: 2
      },
      {
        name: 'Reports',
        routeName: 'ReportsView',
        icon: 'bi bi-file-earmark-plus-fill',
        id: 3
      },
      {
        name: 'Favorites',
        routeName: 'FavoriteListView',
        icon: 'bi bi-pin-angle-fill',
        id: 4
      },
    ]
  },
]
</script>

<template>
  <div class="position-relative">
    <aside
      :style="{ width: sideBarState ? '270px' : '110px' }"
      class="aside-wrapper  position-relative vh-100" />
    <div
      @click="handleSideBarState"
      :style="{ width: sideBarState ? '270px' : '110px', top: '0px', left: '0px' }"
      class="vh-100 d-flex flex-column  aside-content position-fixed">
      <div :class="['aside-header w-100 d-flex align-items-center justify-content-center', userColorData.color]">
        <i class="bi bi-grid-fill fs-1 text-white"></i>
      </div>
      <div class="d-flex flex-column align-items-center bg-white flex-grow-1">
        <div class="bottom-0 mb-4 position-absolute">
          <div  :style="{ width: sideBarState ? '220px' : '60px'}"
                class="router-option d-flex align-items-center"
                @click.stop="handleSideBarRoute({ routeName: 'User Settings' })"
          >
            <i :class="['bi bi-gear-fill fs-4 me-4 text-white px-3 py-2 rounded-3', userColorData.color]"></i>
            <transition name="fade">
            <div v-if="sideBarState" class="d-flex w-100  align-items-center">
              <p :class="['fw-bold m-0 fs-5', userColorData.text]"> Settings </p>
            </div>
            </transition>
          </div>
        </div>
        <div
          :key="route.id"
          v-for="route in RouterOptions">
          <div class="mt-4"
               :key="option.id"
               v-for="option in route.router"
               v-if="route.name != 'User Options'"
          >
            <div
              @click.stop="handleSideBarRoute(option)"
              :style="{ width: sideBarState ? '220px' : '60px' }"
              class="d-flex router-option align-items-center">
              <i :class="[option.icon, 'fs-4 me-4 text-white px-3 py-2 rounded-3', userColorData.color]"></i>
              <transition name="fade">
                <p v-if="sideBarState" :class="['fw-bold m-0 fs-5', userColorData.text]"> {{ option.name }} </p>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.drop-up {
  border: 1px solid #EBEBEB;
}

.aside-content {
  transition: 0.5s;
}

.aside-header {
  height: 130px;
}

.router-option {
  transition: 0.5s;
  cursor: pointer;
}

.aside-wrapper {
  transition: 0.5s;
}

.fade-enter-active {
  transition: opacity 0.5s ease;
}

.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.fade-enter-to, .fade-leave-from {
  opacity: 1;
}

</style>
