<script setup>
import { ref } from 'vue'
import { modalsManagementStore } from '@/stores/modalsManagement.ts'
import { funnelsManagementStore } from '@/stores/funnelsManagement.ts'

const modalManagement = modalsManagementStore()
const funnelsManagement = funnelsManagementStore()

const props = defineProps({
  funnelData: { type: Object, required: true }
})

const funnelData = props.funnelData

const dropDownState = ref(false)

const handleDropDownState = () => {
  dropDownState.value = !dropDownState.value
}

const handleModalState = () => {
  const funnelPayload = {
    funnelData,
    dataType: 'funnel'
  }
  modalManagement.handleModalState({ action: 'Create Funnel', modalData: funnelPayload, editMode: true })
  handleDropDownState()
}

const duplicateFunnel = () => {
  funnelsManagement.duplicateFunnel(funnelData)
  handleDropDownState()
}

</script>

<template>
  <div  class="card bg-white rounded-3  border-0">
    <div v-if="dropDownState" style="top: 45px; right: 60px; border: 1px solid #EBEBEB" class="card-body bg-white rounded-2 position-absolute  col-10 col-md-6 d-flex">
      <div class="w-100">
        <div @click="handleModalState" class="py-2 px-3 drop-up-option rounded-3 text-primary w-100 d-flex justify-content-between">
                  <p class="m-0">Edit</p>
                  <i class="bi bi-pencil-fill"></i>
        </div>
        <div @click="duplicateFunnel" class="mt-2 drop-up-option w-100 py-2 px-3 rounded-3 text-primary d-flex justify-content-between">
                  <p class="m-0">Duplicate</p>
                  <i class="bi bi-copy"></i>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="">
        <div class="d-flex mx-1 align-items-center justify-content-between ">
          <h4 class="fs-6 text-primary fw-bold m-0">{{ funnelData.name }}</h4>
          <p class="fs-6 fw-bold text-primary m-0">Code: {{ funnelData.id }}</p>
        </div>
        <div class="my-2 d-flex align-items-center justify-content-between ">
          <button class="bg-transparent border-0"><i class="bi py-1 px-2 rounded-2  bg-primary text-white bi-plus-lg"></i></button>
          <button class="bg-transparent border-0"><i @click.stop="handleDropDownState" class="bi py-1 px-2 rounded-2  button-option bg-primary text-white bi-three-dots"></i></button>
        </div>
      </div>
      <div class="mx-1 pt-4 pb-2">
        <p class="m-0 text-primary fs-6"> {{ funnelData.description }} </p>
        <p class="text-end text-primary m-0">{{ funnelData.date }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.button-option {
  background-color: #EBEBEB;
}

.drop-up-option {
  cursor: pointer;
  transition: 0.5s
}

.drop-up-option:hover {
  background-color: #EBEBEB;
}

.card {
  cursor: pointer;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.05),
  0 -4px 10px rgba(0, 0, 0, 0.01),
  -4px 0 10px rgba(0, 0, 0, 0.01),
  4px 0 10px rgba(0, 0, 0, 0.01);
}
</style>
