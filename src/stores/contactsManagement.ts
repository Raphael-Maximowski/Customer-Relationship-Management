import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { toastManagementStore } from '@/stores/toastManagement.ts'

export const contactsManagementStore = defineStore('contactsManagementStore', () => {
  const contactsState = ref([
    { name: 'John Doe', id: 1, stepId: 1, funnelId: 1, interestIn: 'Participate In the New Project', tradingValue: '1.599,00', contactNumber: '+55 (99) 9999-9999', contactCompany: 'Explorex', contactAddress: 'Main Avenue', contactCNPJ: '11-111-111/0001-11' },
    { name: 'John Doe', id: 2, stepId: 1, funnelId: 1, interestIn: 'Participate In the New Project', tradingValue: '1.599,00', contactNumber: '+55 (99) 9999-9999', contactCompany: 'Explorex', contactAddress: 'Main Avenue', contactCNPJ: '11-111-111/0001-11' },
    { name: 'John Doe', id: 3, stepId: 2, funnelId: 1, interestIn: 'Participate In the New Project', tradingValue: '1.599,00', contactNumber: '+55 (99) 9999-9999', contactCompany: 'Explorex', contactAddress: 'Main Avenue', contactCNPJ: '11-111-111/0001-11' },
    { name: 'John Doe', id: 4, stepId: 3, funnelId: 1, interestIn: 'Participate In the New Project', tradingValue: '1.599,00', contactNumber: '+55 (99) 9999-9999', contactCompany: 'Explorex', contactAddress: 'Main Avenue', contactCNPJ: '11-111-111/0001-11' },
    { name: 'John Doe', id: 5, stepId: 3, funnelId: 1, interestIn: 'Participate In the New Project', tradingValue: '1.599,00', contactNumber: '+55 (99) 9999-9999', contactCompany: 'Explorex', contactAddress: 'Main Avenue', contactCNPJ: '11-111-111/0001-11' },
    { name: 'John Doe', id: 6, stepId: 4, funnelId: 1, interestIn: 'Participate In the New Project', tradingValue: '1.599,00', contactNumber: '+55 (99) 9999-9999', contactCompany: 'Explorex', contactAddress: 'Main Avenue', contactCNPJ: '11-111-111/0001-11' },
  ])

  const contactsGetterState = computed(() => contactsState.value)

  const getFilteredContacts = (stepId) => {
    return contactsGetterState.value.filter((ContactInArray) => ContactInArray.stepId === stepId)
  }

  const createNewContact = (contactPayload) => {
    const toastStore = toastManagementStore()
    const contactToPush = ref(contactPayload)
    const contactId = contactsGetterState.value.length === 0 ? 1 : contactsGetterState.value[contactsGetterState.value.length  -1].id + 1
    contactToPush.value = {
      ...contactToPush.value,
      id: contactId
    }

    contactsState.value.push(contactToPush.value)
    toastStore.succesToast("Contact created with succes!")
  }

  const updateContact = (contactPayload) => {
    console.log("Paylaod Received: ", contactPayload)
    const toastStore = toastManagementStore()
    if (!contactPayload.id) {
      toastStore.errorToast("An Error Ocurred While Updating, Try Again Later")
      return
    }

    console.log("ContactPaylaod: ", contactPayload)
    toastStore.succesToast("Contact Updated With Success!")
  }

  const deleteContact = (contactId) => {
    const toastStore = toastManagementStore()
    if (!contactId) {
      toastStore.errorToast("An Error Ocurred While Deleting, Try Again!")
      return
    }
    contactsState.value = contactsState.value.filter((contactInArray) => contactInArray.id !== contactId)
    toastStore.succesToast("Contact Deleted with Succes!")
  }

  const deleteCascadeContacts = (stepId) => {
    contactsState.value = contactsGetterState.value.filter((ContactInArray) => ContactInArray.stepId !== stepId)
  }
  return { getFilteredContacts, createNewContact, deleteCascadeContacts, deleteContact, updateContact }

})
