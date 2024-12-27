<script setup>
import { contactsManagementStore } from '@/stores/contactsManagement.ts'
import { useRouter } from 'vue-router'

const contactStore = contactsManagementStore()
const router = useRouter()
const props =  defineProps({
  contact: { type: Object, required: true }
})

const redirectToFunnel = () => {
  router.push({ name: 'CRMStepsView', params: { id: props.contact.funnelId } })
}

const changeFavoriteContactState = () => {
  contactStore.setFavoriteState(props.contact)
}
</script>

<template>
  <div @click="redirectToFunnel" class="list-item mt-3 w-100 text-primary d-flex align-items-center justify-content-between py-2 px-3 rounded-2">
    <div class="d-flex align-items-center">
      <i class="bi fs-5 bi-person-fill me-3"></i>
      <p class="m-0"> {{ contact.name }} </p>
    </div>
    <i @click.stop="changeFavoriteContactState" class="bi bi-x-lg"></i>
  </div>
</template>

<style scoped>
.list-item {
  border: 1px solid #0D6EFD;
  cursor: pointer;
}
</style>
