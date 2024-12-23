<script setup>
import { modalsManagementStore } from '@/stores/modalsManagement.ts'

const modalStore = modalsManagementStore()
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
  <div @click="handleUpdateModalState" class="text-primary funnel-return fs-6 w-100 my-2 d-flex align-items-center">
    <i class="bi me-3 bi-person-fill"></i>
    <p class="m-0"> {{ contactData.name }} </p>
  </div>
</template>

<style>
.funnel-return {
  cursor: pointer;
}
</style>
