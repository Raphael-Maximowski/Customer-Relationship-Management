<script setup>
import { modalsManagementStore } from '@/stores/modalsManagement.ts'
import { userConfigStore } from '@/stores/userConfigManagement.ts'

const modalStore = modalsManagementStore()
const userStore = userConfigStore()
const userColorData = userStore.userColorData
const props = defineProps({
  contactData: { type: Object, required: true }
})

const handleUpdateModalState = () => {
  const payload = {
    action: 'Create Contact',
    modalData: props.contactData,
    editMode: true
  }
  modalStore.handleModalState(payload)
}

</script>

<template>
  <div @click="handleUpdateModalState" :class="['funnel-return fs-6 w-100 my-2 d-flex align-items-center', userColorData.text]">
    <i class="bi me-3 bi-person-fill"></i>
    <p class="m-0"> {{ contactData.name }} </p>
  </div>
</template>

<style>
.funnel-return {
  cursor: pointer;
}
</style>
