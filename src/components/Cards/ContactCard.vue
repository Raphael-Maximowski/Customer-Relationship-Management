<script setup>

import { modalsManagementStore } from '@/stores/modalsManagement.ts'
import { onMounted } from 'vue'

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

const redirectToWhatsApp = () => {
  const number = props.contactData.contactNumber.replace(/[+(),\s-]/g, '')
  window.open(`https://wa.me/${number}`, '_blank');
}

</script>

<template>
  <div @click="handleUpdateModalState" class=" px-4 position-relative py-3 contact-container bg-white w-100 my-4 rounded-3">
    <div class="card-header d-flex align-items-center justify-content-between">
      <h5 class="fs-6"> {{ contactData.name }} </h5>
      <i @click.stop="redirectToWhatsApp" class="bi bi-whatsapp"></i>
    </div>
    <div class="mt-2 card-body">
      <p class="m-0">{{ contactData.interestIn ? 'Interested In: ' + contactData.interestIn : 'Empty Description' }}</p>
      <p style="right: 30px; bottom: 0px" class="value position-absolute ">{{ contactData.tradingValue ? contactData.tradingValue : '0,00' }} </p>
    </div>
  </div>
</template>

<style scoped>
.contact-container {
  min-height: 140px;
  cursor: pointer;
}

p {
  font-size: 14px;
}
</style>
