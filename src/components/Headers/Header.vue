<script setup>
import { userConfigStore } from '@/stores/userConfig.ts'
import { computed, ref } from 'vue'

const userConfig = userConfigStore()
const userConfigWidth = computed(() => userConfig.userWidth)
const mobileHeaderState = ref(false)
const handleMobileHeaderState = () => {
  mobileHeaderState.value = !mobileHeaderState.value
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
        routeName: '',
        icon: 'bi bi-person-rolodex',
        id: 2
      },
      {
        name: 'Reports',
        routeName: '',
        icon: 'bi bi-file-earmark-plus-fill',
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
        icon: 'bi bi-cloud-plus-fill',
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

</script>

<template>
  <div
    v-if="userConfigWidth > 992"
    class="d-flex align-items-center header-desktop w-100 ">
    <div class="w-50 d-flex flex-column justify-content-center h-100
">
        <p class="ms-5 text-primary m-0 fs-4 fw-bold">Welcome User</p>
      <p class="ms-5 fs-4 m-0 text-primary fw-bold">Instructions to DO Everything bla bla bla</p>
    </div>
    <div class="w-25 h-100 d-flex align-items-center">
      <input placeholder="Input MockUp" class="form-control py-2 w-100" />
    </div>
    <div class="w-25 h-100 d-flex align-items-center justify-content-around">
      <button type="button" class="btn btn-primary fs-6 w-50 py-2 ">Primary</button>
    </div>
  </div>

  <div v-else >
    <div class="flex-column mb-5 text-center d-flex align-items-center justify-content-center mobile-header bg-primary">
      <h1 class="text-white title">CUSTOMER RELATIONSHIP</h1>
      <h2 class="text-white sub-title">MANAGEMENT</h2>
      <button style="top: 10px; left: 10px" class="position-absolute border-0 bg-transparent">
        <i @click="handleMobileHeaderState" class="bi bi-list fs-2 text-white"></i>
      </button>
    </div>
    <div v-if="mobileHeaderState" class="d-flex align-items-center flex-column mobile-header-body position-absolute bg-primary w-100 z-3">
      <div class="w-75">
        <div
          :key="routerOption.id"
          v-for="routerOption in RouterOptions"
          class="w-100 d-flex flex-column justify-content-center mb-5"
        >
          <div class="d-flex align-items-center py-2 router-option">
            <i :class="[routerOption.icon, 'me-4 text-white fs-3']"></i>
            <p class="m-0 text-white fs-6">{{ routerOption.name }}</p>
          </div>
          <div
            v-for="option in routerOption.router"
            class="py-2 d-flex align-items-center router router-option mx-5 ">
            <i :class="[option.icon, 'text-white me-4 fs-5 ']"></i>
            <p class="m-0 text-white fs-6"> {{ option.name }} </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.router-option {
  border-bottom: 1px solid white;
}

.router {
  cursor: pointer;
}

.mobile-header {
  height: 250px;
}

.mobile-header-body {
  height: calc(100vh - 250px);
}

.title {
  font-size: 20px;
  letter-spacing: 3px;
}


.sub-title {
  font-size: 20px;
  letter-spacing: 18px;
}

.header-desktop {
  height: 145px;
}
</style>
