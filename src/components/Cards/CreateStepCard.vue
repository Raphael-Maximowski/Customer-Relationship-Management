<script setup>
import { ref } from 'vue'
import { stepsManagementStore } from '@/stores/stepsManagement.ts'
import { useRoute } from 'vue-router'
import { userConfigStore } from '@/stores/userConfigManagement.ts'
const createState = ref(false)
const stepName = ref('')
const stepsManagement = stepsManagementStore()
const userStore = userConfigStore()
const userColorData = userStore.userColorData
const route = useRoute()

const createNewStep = () => {
  const payload = ref({
    name: stepName.value,
    funnelId: route.params.id
  })

  stepsManagement.createStep(payload)
  handleCreation()
  stepName.value = ''
}

const handleCreation = () => {
  createState.value = !createState.value
}
</script>

<template>
  <div class="steps-container d-flex flex-column  mx-5 h-100">
    <div :class="['px-3 steps-header d-flex text-white align-items-center justify-content-between  w-100', userColorData.color]">
      <p v-if="!createState" class="m-0 fs-6 ">Create New Step</p>
      <div v-else class="d-flex align-items-center justify-content-between w-100">
        <input @keyup.enter="createNewStep" v-model="stepName" placeholder="Insert the New Step Name" class="form-control text-white bg-transparent border-0"/>
        <i @click="handleCreation" class="text-white bi bi-x-circle me-2"></i>
      </div>
    </div>
    <div class="steps-body d-flex align-items-center justify-content-center flex-grow-1 mb-5">
      <i @click="handleCreation" :class="['bi bi-plus-square mb-5 fs-2', userColorData.text]"></i>
    </div>
  </div>
</template>

<style scoped>

.bi-plus-square {
  color: lightgray;
}

.form-control::placeholder {
  color: white;
}

.bi-plus-square, .bi-x-circle {
  cursor: pointer;
}

.steps-container {
  min-width: 450px;
}

.steps-header {
  height: 60px;
  border-radius: 10px 10px 0px 0px;
}
</style>
