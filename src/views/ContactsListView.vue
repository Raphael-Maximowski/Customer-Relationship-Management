<script setup>

import { computed, onMounted, ref } from 'vue'
import { contactsManagementStore } from '@/stores/contactsManagement.ts'
import FilterContactForm from '@/components/Forms/FilterContactForm.vue'
import ContactFilteredCard from '@/components/Cards/ContactFilteredCard.vue'
import { userConfigStore } from '@/stores/userConfigManagement.ts'

const contactsStore = contactsManagementStore()
const contactsData = computed(() => contactsStore.contactsGetterState)
const filteredContacts = computed(() => contactsStore.filteredContacts)
const userConfig = userConfigStore()
const userConfigWidth = computed(() => userConfig.userWidth)

onMounted(() => {
  contactsStore.setFilteredContactsData(contactsData.value)
})

</script>

<template>
  <FilterContactForm />
  <div class="d-flex mt-3 mx-5 flex-wrap contacts-container">
    <ContactFilteredCard
      v-for="contact in filteredContacts"
      :id="contact.id"
      :style="{
        flex: userConfigWidth < 700 ? '1 1 calc(100% - 16px)' : userConfigWidth < 1300 ? '1 1 calc(50% - 50px)' : '1 1 calc(33.3% - 50px)',
        maxWidth: userConfigWidth < 700 ? '100%' : userConfigWidth < 1300 ? '49%' : '32.5%'
      }"
      :contact="contact" />
  </div>
</template>

<style scoped>
.contacts-container {
  gap: 16px;
}
</style>
