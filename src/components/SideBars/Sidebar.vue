<script setup lang="ts">
import { userConfigStore } from '@/stores/userConfig.ts'
import { buttonsManagementStore } from '@/stores/ButtonsManagement.ts'
import { computed, ref } from 'vue'
import { modalsManagementStore } from '@/stores/modalsManagement.ts'

const userConfig = userConfigStore()
const buttonsManagement = buttonsManagementStore()
const buttonMessage = computed(() => buttonsManagement.buttonData)
const modalsManagement = modalsManagementStore()
const userConfigWidth = computed(() => userConfig.userWidth)
const sideBarState = ref(false)
const dropUpState = ref(false)

const handleSideBarState = () => {
  sideBarState.value = !sideBarState.value
}

const handleDropUpState = () => {
  dropUpState.value = !dropUpState.value
}

const RouterOptions = [
  {
    name: 'CRM Options',
    icon: 'bi bi-layers-fill',
    id: 1,
    router: [
      {
        name: 'Funnels',
        routeName: '',
        icon: 'bi bi-funnel-fill',
        id: 1
      },
      {
        name: 'Contacts',
        routeName: '',
        icon: 'bi bi-person-rolodex',
        id: 2
      },
      {
        name: 'Reports',
        routeName: '',
        icon: 'bi bi-grid',
        id: 3
      },
      {
        name: 'Favorites',
        routeName: '',
        icon: 'bi bi-heart-fill',
        id: 4
      },
      {
        name: 'Create',
        routeName: '',
        icon: 'bi bi-file-earmark-plus-fill',
        id: 5
      }
    ]
  },
  {
    name: 'User Options',
    icon: 'bi bi-person-circle',
    id: 2,
    router: [
      {
        name: 'Configuration',
        routeName: '',
        icon: 'bi bi-gear-fill',
        id: 6
      },
      {
        name: 'About the Project',
        routeName: '',
        icon: 'bi bi-exclamation-triangle-fill',
        id: 8
      },
      {
        name: 'Contact Creator',
        routeName: '',
        icon: 'bi bi-telephone-fill',
        id: 9
      }
    ]
  }
]


const handleModalState = () => {
  modalsManagement.handleModalState({ action: buttonMessage.value })
}

</script>

<template>
  <div
    class="d-flex"
    v-if="userConfigWidth > 992">
    <aside
      @click="handleSideBarState"
      :style="{ width: sideBarState ? '275px' : '100px' }" class="aside-container vh-100 d-flex flex-column">
      <div class="aside-header bg-primary d-flex align-items-center justify-content-center">
        <i class="bi bi-stack fs-2 text-white"></i>
      </div>
      <div class="aside-body bg-white d-flex flex-column align-items-center flex-grow-1">
        <transition name="slide-up-down">
          <div
            v-if="dropUpState && sideBarState"
            class="drop-up fw-bold text-primary rounded-1 position-absolute">
            <div v-for="userRoute in RouterOptions">
              <div v-if="userRoute.name  !== 'CRM Options' ">
                <div
                  v-for="userOption in userRoute.router"
                  class="user-option d-flex py-2 align-items-center">
                  <i :class="[userOption.icon, 'mx-3 ']"></i>
                  <p class="m-0">{{ userOption.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </transition>
        <div class="position-absolute user-options">
          <div
            @click.stop="handleDropUpState"
            :style="{ width: sideBarState ? '180px' : '50px', transition: '0.5s' }"
            class="d-flex align-items-center justify-content-between mt-4">
            <div class="w-auto px-3 bg-primary py-2 rounded-3 me-3 d-flex align-items-center">
              <i :class="['bi bi-person-circle text-white fs-6']"></i>
            </div>
            <transition name="fade">
              <div
                v-if="sideBarState"
                class="d-flex w-100 align-items-center justify-content-between">
                <p class="m-0 fs-6 text-primary fw-bold">UserName</p>
                <i :class="[ dropUpState ? 'bi-chevron-down' : 'bi-chevron-up', 'bi fw-bold text-primary']"></i>
              </div>

            </transition>
          </div>
        </div>
        <div
          :key="userSection.id"
          v-for="userSection in RouterOptions"
        >
          <div
            :style="{ width: sideBarState ? '180px' : '50px', transition: '0.5s' }"
            class="d-flex align-items-center mt-4"
            :key="routeOption.id"
            v-for="routeOption in userSection.router">
            <div v-if="userSection.name !== 'User Options'"
                 class="w-auto px-3 bg-primary py-2 rounded-3 me-3 d-flex align-items-center">
              <i :class="[routeOption.icon, 'text-white fs-6']"></i>
            </div>
            <transition name="fade">
              <p class="m-0 fs-6 text-primary fw-bold" v-if="sideBarState && userSection.name !== 'User Options'">
                {{ routeOption.name }}</p>
            </transition>
          </div>
        </div>
      </div>
    </aside>
    <div class="d-flex flex-column w-100">
      <header class="header-content justify-content-between d-flex align-items-center ">
        <div class="ms-5">
          <h2 class="fs-4 text-primary fw-bold">Welcome User</h2>
          <h3 class="fs-5 text-primary fw-bold">We Wish you a awesome experience</h3>
        </div>
        <button @click="handleModalState"  type="button" class="btn btn-primary mx-5 px-5"> {{ buttonMessage }} </button>
      </header>
      <div class="flex-grow-1 modal-content">
      <RouterView v-if="userConfigWidth > 992" />
      </div>
    </div>

  </div>
  <div
    v-else
  >
    <header class="header-container bg-primary w-100 d-flex align-items-center justify-content-center">
      <button class="bg-transparent border-0 rounded-1 button-container position-absolute">
        <i
          @click="handleSideBarState"
          class="bi bi-list fs-4 text-white"></i>
      </button>
      <div class="text-white">
        <h1 class="fs-5 title">CUSTOMER RELATIONSHIP</h1>
        <h2 class="fs-6 subtitle">MANAGEMENT</h2>
      </div>
    </header>
    <nav
      v-if="sideBarState"
      class="header-body bg-primary">
      <div class="w-100 page-divisor bg-white"></div>
      <div class="d-flex  h-100 flex-column  align-items-center">
        <div
          class="mt-5 option-container"
          v-for="userSection in RouterOptions"
          :key="userSection.id"
        >
          <div class="d-flex align-items-center">
            <i :class="[userSection.icon ,'text-white fs-3 me-4']"></i>
            <p class="m-0 fs-6 text-white">{{ userSection.name }}</p>
          </div>

          <div
            class="mx-5 router-option"
            :key="routeOption.id"
            v-for="routeOption in userSection.router">
            <div class="w-100 page-divisor bg-white"></div>
            <div class="py-2 d-flex align-items-center">
              <i :class="[ routeOption.icon ,'fs-5 text-white me-4']"></i>
              <p class="m-0 text-white">{{ routeOption.name }}</p>
            </div>

          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.modal-content {
  background-color: #EBEBEB;
}

.drop-up {
  width: 210px;
  bottom: 60px;
  border: 1px solid #EBEBEB;
}

.user-option {
  border-bottom: 1px solid #EBEBEB;
  transition: 0.3s;
}

.user-option:hover {
  background-color: #EBEBEB;
}

.user-options {
  bottom: 10px;
}

.header-content {
  height: 100px;
  background-color: rgba(211, 211, 211, 0.45);
}

.aside-header {
  height: 100px;
}

.aside-container {
  transition: 0.5s;
  cursor: pointer;
}

.option-container {
  width: 80%;
}

.router-option {
  cursor: pointer;
}

.page-divisor {
  height: 2px;
}

.header-body {
  height: calc(100vh - 150px);
}

.header-container {
  height: 150px;
  font-family: Arial;
}

.title {
  letter-spacing: 2px;
}

.subtitle {
  letter-spacing: 20px;
}

.button-container {
  top: 10px;
  left: 10px;
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

.slide-up-down-enter-active,
.slide-up-down-leave-active {
  transition: transform 0.6s ease, opacity 0.4s ease;
}

.slide-up-down-enter-from {
  transform: translateY(125%);
  opacity: 0;
}

.slide-up-down-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.slide-up-down-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.slide-up-down-leave-to {
  transform: translateY(125%);
  opacity: 0;
}
</style>
