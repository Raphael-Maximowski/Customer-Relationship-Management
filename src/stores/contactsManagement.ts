import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { toastManagementStore } from '@/stores/toastManagement.ts'

export const contactsManagementStore = defineStore('contactsManagementStore', () => {
  const contactsState = ref([
    { name: '1', contactPosition: 0, id: 1, stepId: 1, funnelId: "1", interestIn: 'Participate In the New Project', tradingValue: '1.599,00', contactNumber: '+55 (99) 9999-9999', contactCompany: 'Explorex', contactAddress: 'Main Avenue', contactCNPJ: '11-111-111/0001-11' },
    { name: '2', contactPosition: 1, id: 2, stepId: 1, funnelId: "1", interestIn: 'Participate In the New Project', tradingValue: '1.599,00', contactNumber: '+55 (99) 9999-9999', contactCompany: 'Explorex', contactAddress: 'Main Avenue', contactCNPJ: '11-111-111/0001-11' },
    { name: '3', contactPosition: 2, id: 3, stepId: 1, funnelId: "1", interestIn: 'Participate In the New Project', tradingValue: '1.599,00', contactNumber: '+55 (99) 9999-9999', contactCompany: 'Explorex', contactAddress: 'Main Avenue', contactCNPJ: '11-111-111/0001-11' },
    { name: 'D', contactPosition: 0, id: 4, stepId: 2, funnelId: "1", interestIn: 'Participate In the New Project', tradingValue: '1.599,00', contactNumber: '+55 (99) 9999-9999', contactCompany: 'Explorex', contactAddress: 'Main Avenue', contactCNPJ: '11-111-111/0001-11' },
    { name: 'E', contactPosition: 1, id: 5, stepId: 2, funnelId: "1", interestIn: 'Participate In the New Project', tradingValue: '1.599,00', contactNumber: '+55 (99) 9999-9999', contactCompany: 'Explorex', contactAddress: 'Main Avenue', contactCNPJ: '11-111-111/0001-11' },
    { name: 'F', contactPosition: 2, id: 6, stepId: 2, funnelId: "1", interestIn: 'Participate In the New Project', tradingValue: '1.599,00', contactNumber: '+55 (99) 9999-9999', contactCompany: 'Explorex', contactAddress: 'Main Avenue', contactCNPJ: '11-111-111/0001-11' },
    { name: 'G', contactPosition: 3, id: 7, stepId: 2, funnelId: "1", interestIn: 'Participate In the New Project', tradingValue: '1.599,00', contactNumber: '+55 (99) 9999-9999', contactCompany: 'Explorex', contactAddress: 'Main Avenue', contactCNPJ: '11-111-111/0001-11' },
    { name: '4', contactPosition: 0, id: 8, stepId: 3, funnelId: "1", interestIn: 'Participate In the New Project', tradingValue: '1.599,00', contactNumber: '+55 (99) 9999-9999', contactCompany: 'Explorex', contactAddress: 'Main Avenue', contactCNPJ: '11-111-111/0001-11' },
    { name: '5', contactPosition: 1, id: 9, stepId: 3, funnelId: "1", interestIn: 'Participate In the New Project', tradingValue: '1.599,00', contactNumber: '+55 (99) 9999-9999', contactCompany: 'Explorex', contactAddress: 'Main Avenue', contactCNPJ: '11-111-111/0001-11' },
    { name: '6', contactPosition: 0, id: 10,stepId: 4, funnelId: "1", interestIn: 'Participate In the New Project', tradingValue: '1.599,00', contactNumber: '+55 (99) 9999-9999', contactCompany: 'Explorex', contactAddress: 'Main Avenue', contactCNPJ: '11-111-111/0001-11' },
  ])

  const filteredContacts = ref([])

  const setFilteredContactsData = (filteredCOntactsData) => {
    const toastStore = toastManagementStore()

    if (filteredCOntactsData.length === 0) {
      toastStore.errorToast("Nothing was found!")
      filteredContacts.value = filteredCOntactsData
      return
    }
    filteredContacts.value = filteredCOntactsData
  }

  const contactsGetterState = computed(() => contactsState.value)

  const filterContactsByValue = (valueRangePayload) => {
    const minRange = ref('')
    const maxRange = ref('')
    const filteredValues = ref([])
    const shouldBlockFromOthersFilters = ref([])

    if (valueRangePayload.tradingValueFrom) {
      minRange.value = valueRangePayload.tradingValueFrom
      minRange.value = minRange.value.replace(/[R$\s.]/g, '').replace(',', '.')
      minRange.value = parseInt(minRange.value, 10)
    }

    if (valueRangePayload.tradingValueTo) {
      maxRange.value = valueRangePayload.tradingValueTo
      maxRange.value = maxRange.value.replace(/[R$\s.]/g, '').replace(',', '.')
      maxRange.value = parseInt(maxRange.value, 10)
    }

    for (let i = 0; i < contactsState.value.length; i++) {
      const tradingValue = ref(contactsState.value[i].tradingValue)
      tradingValue.value = tradingValue.value.replace(/[R$\s.]/g, '').replace(',', '.')
      tradingValue.value = parseInt(tradingValue.value, 10)

      if (minRange.value && maxRange.value) {
        if (tradingValue.value >= minRange.value && tradingValue.value <= maxRange.value) {
          filteredValues.value.push(contactsState.value[i])
          continue
        }
        shouldBlockFromOthersFilters.value.push(contactsState.value[i])
        continue
      }

      if (minRange.value) {
        if (tradingValue.value > minRange.value) {
          filteredValues.value.push(contactsState.value[i])
          continue
        }
        shouldBlockFromOthersFilters.value.push(contactsState.value[i])
        continue
      }

      if (maxRange.value) {
        if (tradingValue.value < maxRange.value) {
          filteredValues.value.push(contactsState.value[i])
          continue
        }

        shouldBlockFromOthersFilters.value.push(contactsState.value[i])
        continue
      }
    }

    const filteredTradingValueData = {
      contactPassed: filteredValues.value,
      contactBlocked: shouldBlockFromOthersFilters.value
    }

    return filteredTradingValueData
  }

  const orderContacts = (event, stepId) => {
    const filteredContacts = getFilteredContacts(stepId)
    if (event.removed) {
      const indexToDelete = contactsState.value.findIndex((contactInArray) => contactInArray.id === event.removed.element.id)
      contactsState.value.splice(indexToDelete, 1)

      for (let i = 0 ; i < filteredContacts.length; i++) {
        if (filteredContacts[i].contactPosition > event.removed.oldIndex) {
          const indexToManipulate = contactsState.value.findIndex((contactInArray) => contactInArray.id === filteredContacts[i].id)
          contactsState.value[indexToManipulate].contactPosition--
        }
      }
      return
    } else if ( event.added ) {
      const contactToPush = ref(event.added.element)
      contactToPush.value.contactPosition = event.added.newIndex
      contactToPush.value.stepId = stepId
      contactsState.value.push(contactToPush.value)

      console.log("New Contact: ", contactToPush.value)

      for (let i = 0; i < filteredContacts.length; i++) {
        if (filteredContacts[i].contactPosition >= event.added.newIndex) {
          const indexToManipulate = contactsState.value.findIndex((contactInArray) => contactInArray.id === filteredContacts[i].id )
          contactsState.value[indexToManipulate].contactPosition++
        }
      }

      return
    }

    if (event.moved.newIndex < event.moved.oldIndex) {
      for(let i = 0; i < filteredContacts.length; i++) {
        if (filteredContacts[i].contactPosition >= event.moved.newIndex
          && filteredContacts[i].contactPosition < event.moved.oldIndex) {
          const index = contactsState.value.findIndex((contactInArray) => contactInArray.id === filteredContacts[i].id)
          contactsState.value[index].contactPosition++
        }
      }

      const index = contactsState.value.findIndex((contactsInArray) => contactsInArray.id === event.moved.element.id)
      contactsState.value[index].contactPosition = event.moved.newIndex
      return
    }

    for (let i = 0; i < filteredContacts.length; i++) {
      if (filteredContacts[i].contactPosition > event.moved.oldIndex
        && filteredContacts[i].contactPosition <= event.moved.newIndex) {
        const index = contactsState.value.findIndex((contactInArray) => contactInArray.id === filteredContacts[i].id)
        contactsState.value[index].contactPosition--
      }
    }

    const index = contactsState.value.findIndex((contactsInArray) => contactsInArray.id === event.moved.element.id)
    contactsState.value[index].contactPosition = event.moved.newIndex
  }

  const getFilteredContacts = (stepId) => {
    const filteredContacts = contactsGetterState.value.filter((ContactInArray) => ContactInArray.stepId === stepId)
    return filteredContacts.sort((a, b) => a.contactPosition - b.contactPosition)
  }

  const createNewContact = (contactPayload) => {
    const toastStore = toastManagementStore()
    const contactToPush = ref(contactPayload.value)
    const contactId = contactsGetterState.value.length === 0 ? 1 : contactsGetterState.value[contactsGetterState.value.length  -1].id + 1
    contactToPush.value = {
      ...contactToPush.value,
      id: contactId,
      contactPosition: 0
    }

    const contactsInStep = getFilteredContacts(contactToPush.value.stepId)
    for (let i = 0; i < contactsInStep.length; i++) {
      const index = contactsState.value.findIndex((contactsInArray) => contactsInArray.id === contactsInStep[i].id)
      contactsState.value[index].contactPosition++
    }

    console.log("Contact Created: ", contactToPush.value)
    contactsState.value.push(contactToPush.value)
    toastStore.succesToast("Contact created with succes!")
  }

  const updateContact = (contactPayload) => {
    const toastStore = toastManagementStore()
    if (!contactPayload.id) {
      toastStore.errorToast("An Error Ocurred While Updating, Try Again Later")
      return
    }

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
  return { filteredContacts ,setFilteredContactsData ,filterContactsByValue ,contactsGetterState ,orderContacts ,contactsState ,getFilteredContacts, createNewContact, deleteCascadeContacts, deleteContact, updateContact }

},{ persist: true }  )
