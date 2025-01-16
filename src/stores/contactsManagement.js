import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { toastManagementStore } from '@/stores/toastManagement.js'

export const contactsManagementStore = defineStore('contactsManagementStore', () => {
  const contactsState = ref([
    { name: 'ContactExample1', contactPosition: 0, id: 1, stepId: 1, funnelId: "1", interestIn: 'Participate In the New Project', tradingValue: '1.599,00', contactNumber: '+55 (99) 99999-9999', contactCompany: 'Example Company', contactAddress: 'Main Avenue', contactCNPJ: '11-111-111/0001-11' },
    { name: 'ContactExample2', contactPosition: 1, id: 2, stepId: 1, funnelId: "1", interestIn: 'Participate In the New Project', tradingValue: '1.599,00', contactNumber: '+55 (99) 99999-9999', contactCompany: 'Example Company', contactAddress: 'Main Avenue', contactCNPJ: '11-111-111/0001-11' },
    { name: 'ContactExample3', contactPosition: 2, id: 3, stepId: 1, funnelId: "1", interestIn: 'Participate In the New Project', tradingValue: '1.599,00', contactNumber: '+55 (99) 99999-9999', contactCompany: 'Example Company', contactAddress: 'Main Avenue', contactCNPJ: '11-111-111/0001-11' },
    { name: 'ContactExample4', contactPosition: 0, id: 4, stepId: 2, funnelId: "1", interestIn: 'Participate In the New Project', tradingValue: '1.599,00', contactNumber: '+55 (99) 99999-9999', contactCompany: 'Example Company', contactAddress: 'Main Avenue', contactCNPJ: '11-111-111/0001-11' },
    { name: 'ContactExample5', contactPosition: 1, id: 5, stepId: 2, funnelId: "1", interestIn: 'Participate In the New Project', tradingValue: '1.599,00', contactNumber: '+55 (99) 99999-9999', contactCompany: 'Example Company', contactAddress: 'Main Avenue', contactCNPJ: '11-111-111/0001-11' },
    { name: 'ExampleContact1', contactPosition: 2, id: 6, stepId: 2, funnelId: "1", interestIn: 'Participate In the New Project', tradingValue: '1.599,00', contactNumber: '+55 (99) 99999-9999', contactCompany: 'Example Company', contactAddress: 'Main Avenue', contactCNPJ: '11-111-111/0001-11' },
    { name: 'ExampleContact2', contactPosition: 3, id: 7, stepId: 2, funnelId: "1", interestIn: 'Participate In the New Project', tradingValue: '1.599,00', contactNumber: '+55 (99) 99999-9999', contactCompany: 'Example Company', contactAddress: 'Main Avenue', contactCNPJ: '11-111-111/0001-11' },
    { name: 'ExampleContact3', contactPosition: 0, id: 8, stepId: 3, funnelId: "1", interestIn: 'Participate In the New Project', tradingValue: '1.599,00', contactNumber: '+55 (99) 99999-9999', contactCompany: 'Example Company', contactAddress: 'Main Avenue', contactCNPJ: '11-111-111/0001-11' },
    { name: 'ExampleContact4', contactPosition: 1, id: 9, stepId: 3, funnelId: "1", interestIn: 'Participate In the New Project', tradingValue: '1.599,00', contactNumber: '+55 (99) 99999-9999', contactCompany: 'Example Company', contactAddress: 'Main Avenue', contactCNPJ: '11-111-111/0001-11' },
    { name: 'ExampleContact4', contactPosition: 0, id: 10,stepId: 4, funnelId: "1", interestIn: 'Participate In the New Project', tradingValue: '1.599,00', contactNumber: '+55 (99) 99999-9999', contactCompany: 'Example Company', contactAddress: 'Main Avenue', contactCNPJ: '11-111-111/0001-11' },
  ])

  const succedContactsFromStep = (stepId) => {
    const contactsInStep = contactsState.value.filter((contactInState) =>
      contactInState.stepId == stepId)
    return contactsInStep.length
  }

  const rejectedContactsFromStep = (stepId) => {
    const contactsInStep = contactsState.value.filter((contactInArray) => contactInArray.stepId == stepId)

    return contactsInStep.length
  }

  const percentageByFunnel = (stepId) => {
    const filteredData = contactsState.value.filter((contactInArray) => contactInArray.stepId == stepId)
    return filteredData.length
  }

  const filterContactsByProfit = (validSteps) => {
    const stepsIncome = validSteps
    const totalValue = ref([])

    stepsIncome.map((stepInArray) => {
      const totalValueInStep = ref(0)
      contactsState.value.map((contactInArray) => {
        if (contactInArray.stepId == stepInArray.id) {
          const valueToPush = ref(contactInArray.tradingValue)
          valueToPush.value = valueToPush.value.replace(/[R$\s.]/g, '').replace(',', '.')
          valueToPush.value = parseInt(valueToPush.value, 10)

          totalValueInStep.value += valueToPush.value
        }
      })

      totalValue.value.push(totalValueInStep.value)
    })

    return totalValue.value
  }

  const getContactsByFunnelId = (funnelId) => {
    return contactsState.value.filter((contactInArray) => contactInArray.funnelId == funnelId)
  }

  const filteredContacts = ref([])

  const favoriteContacts = computed(() => contactsState.value.filter((contactInArray) => contactInArray.favorite == true))

  const setFilteredContactsData = (filteredCOntactsData) => {
    const toastStore = toastManagementStore()

    if (filteredCOntactsData.length == 0) {
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
      const indexToDelete = contactsState.value.findIndex((contactInArray) => contactInArray.id == event.removed.element.id)
      contactsState.value.splice(indexToDelete, 1)

      for (let i = 0 ; i < filteredContacts.length; i++) {
        if (filteredContacts[i].contactPosition > event.removed.oldIndex) {
          const indexToManipulate = contactsState.value.findIndex((contactInArray) => contactInArray.id == filteredContacts[i].id)
          contactsState.value[indexToManipulate].contactPosition--
        }
      }

      return
    } else if ( event.added ) {
      const contactToPush = ref(event.added.element)
      contactToPush.value.contactPosition = event.added.newIndex
      contactToPush.value.stepId = stepId
      contactsState.value.push(contactToPush.value)

      for (let i = 0; i < filteredContacts.length; i++) {
        if (filteredContacts[i].contactPosition >= event.added.newIndex) {
          const indexToManipulate = contactsState.value.findIndex((contactInArray) => contactInArray.id == filteredContacts[i].id )
          contactsState.value[indexToManipulate].contactPosition++
        }
      }

      const duplicatedContacts = contactsState.value.filter((contactInArray) => contactInArray.id == contactToPush.value.id)
      if (duplicatedContacts.length > 2) {
        const contactDuplicatedIndex = contactsState.value.findIndex((contactInArray) => contactInArray.id === duplicatedContacts[duplicatedContacts.length - 1])

        contactsState.value.splice(contactDuplicatedIndex, 1)
      }
      return
    }

    if (event.moved.newIndex < event.moved.oldIndex) {
      for(let i = 0; i < filteredContacts.length; i++) {
        if (filteredContacts[i].contactPosition >= event.moved.newIndex
          && filteredContacts[i].contactPosition < event.moved.oldIndex) {
          const index = contactsState.value.findIndex((contactInArray) => contactInArray.id == filteredContacts[i].id)
          contactsState.value[index].contactPosition++
        }
      }

      const index = contactsState.value.findIndex((contactsInArray) => contactsInArray.id == event.moved.element.id)
      contactsState.value[index].contactPosition = event.moved.newIndex
      return
    }

    for (let i = 0; i < filteredContacts.length; i++) {
      if (filteredContacts[i].contactPosition > event.moved.oldIndex
        && filteredContacts[i].contactPosition <= event.moved.newIndex) {
        const index = contactsState.value.findIndex((contactInArray) => contactInArray.id == filteredContacts[i].id)
        contactsState.value[index].contactPosition--
      }
    }

    const index = contactsState.value.findIndex((contactsInArray) => contactsInArray.id == event.moved.element.id)
    contactsState.value[index].contactPosition = event.moved.newIndex
  }

  const getFilteredContacts = (stepId) => {

    const filteredContacts = contactsGetterState.value.filter((ContactInArray) => ContactInArray.stepId === stepId)
    return filteredContacts.sort((a, b) => a.contactPosition - b.contactPosition)
  }

  const setFavoriteState = (contactPayload) => {
    const toastStore = toastManagementStore()
    const index = contactsState.value.findIndex((contactInArray) => contactInArray.id == contactPayload.id)
    contactsState.value[index].favorite = !contactPayload.favorite
    toastStore.succesToast("Contact Favorite State Updated!")
  }

  const createNewContact = (contactPayload) => {
    const toastStore = toastManagementStore()
    const contactToPush = ref(contactPayload.value)
    const contactId = contactsGetterState.value.length == 0 ? 1 : contactsGetterState.value[contactsGetterState.value.length  -1].id + 1
    contactToPush.value = {
      ...contactToPush.value,
      id: contactId,
      contactPosition: 0,
      favorite: false
    }

    const contactsInStep = getFilteredContacts(contactToPush.value.stepId)
    for (let i = 0; i < contactsInStep.length; i++) {
      const index = contactsState.value.findIndex((contactsInArray) => contactsInArray.id == contactsInStep[i].id)
      contactsState.value[index].contactPosition++
    }

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

  const deleteContact = (contactPayload) => {
    const toastStore = toastManagementStore()
    if (!contactPayload) {
      toastStore.errorToast("An Error Ocurred While Deleting, Try Again!")
      return
    }

    const contactsInStep = contactsState.value.filter((contactInArray) => contactInArray.stepId == contactPayload.stepId)
    contactsInStep.forEach((contactInArray) => {
      if (contactInArray.contactPosition > contactPayload.contactPosition) {
        const index = contactsState.value.findIndex((contactInState) => contactInState.id == contactInArray.id)
        contactsState.value[index].contactPosition--
      }
    })

    contactsState.value = contactsState.value.filter((contactInArray) => contactInArray.id != contactPayload.id)
    toastStore.succesToast("Contact Deleted with Succes!")
  }

  const deleteCascadeContacts = (stepId) => {
    contactsState.value = contactsGetterState.value.filter((ContactInArray) => ContactInArray.stepId != stepId)
  }
  return { succedContactsFromStep ,rejectedContactsFromStep ,percentageByFunnel ,filterContactsByProfit ,favoriteContacts ,setFavoriteState, getContactsByFunnelId  ,filteredContacts ,setFilteredContactsData ,filterContactsByValue ,contactsGetterState ,orderContacts ,contactsState ,getFilteredContacts, createNewContact, deleteCascadeContacts, deleteContact, updateContact }

},{ persist: true }  )
