<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { toastManagementStore } from '@/stores/toastManagement.js'
import { stepsManagementStore } from '@/stores/stepsManagement.js'
import { contactsManagementStore } from '@/stores/contactsManagement.js'
import ContactCard from '@/components/Cards/ContactCard.vue'
import EmptyStepCard from '@/components/Cards/EmptyStepCard.vue'
import draggable from 'vuedraggable'
import { userConfigStore } from '@/stores/userConfigManagement.js'

const props = defineProps({
  stepInfo: { type: Object, required: true }
})

const stepsManagement = stepsManagementStore()
const toastManagement = toastManagementStore()
const contactsStore = contactsManagementStore()
const userStore = userConfigStore()
const userColorData = userStore.userColorData
const contactsOriginalState = computed(() => contactsStore.contactsState)
const contactsData = ref(contactsStore.getFilteredContacts(props.stepInfo.id))
const newStepName = ref('')
const editStepState = ref(false)

const log = (evt, stepId) => {
  contactsStore.orderContacts(evt, stepId)
}

const editStepName = () => {
  const payload = {
    newStepName: newStepName.value,
    stepsData: props.stepInfo
  }

  stepsManagement.editStep(payload)
  handleEditStepState()
}

const deleteStep = () => {
  stepsManagement.deleteStep(props.stepInfo)
  handleEditStepState()
}

const handleEditStepState = () => {
  editStepState.value = !editStepState.value
}

onMounted(() => {
  console.log("Props: ", props.stepInfo)
})

watch(contactsOriginalState, (newValue) => {
  contactsData.value = contactsStore.getFilteredContacts(props.stepInfo.id)
}, { deep: true } )

</script>

<template>
  <div class="steps-container mx-5 d-flex flex-column   h-100">
    <div :class="['px-3  steps-header d-flex text-white align-items-center justify-content-between  w-100', userColorData.color]">
      <div v-if="!editStepState" class="d-flex justify-content-between w-100">
        <p class="m-0 fs-6 ">{{ stepInfo.name }}</p>
        <i @click="handleEditStepState" class="bi bi-three-dots-vertical"></i>
      </div>
      <div v-else class="w-100 d-flex justify-content-between">
        <input @keyup.enter="editStepName" v-model="newStepName" placeholder="Insert the new Name"
               class="text-white border-0 bg-transparent form-control w-75" />
        <div class="d-flex align-items-center justify-content-around w-25">
          <i @click="handleEditStepState" class="bi bi-x-circle"></i>
          <i @click="deleteStep" class="bi bi-trash3"></i>
        </div>
      </div>
    </div>
    <div class=" steps-body overflow-y-auto flex-grow-1 mb-5">
      <EmptyStepCard v-if="contactsData.length == 0" />
      <draggable
        v-model="contactsData"
        group="contactsData"
        :item-key="key => key"
        @change="event=> log(event, stepInfo.id)"
        animation="350"
      >
        <template #item="{element}">
          <ContactCard
            :key="element.id"
            :contactData="element"
          />
        </template>
      </draggable>
    </div>
  </div>
</template>

<style scoped>
.bi-x-circle, .bi-trash3 {
  cursor: pointer;
}

.steps-container {
  min-width: 450px;
  overflow-y: auto;
}

.steps-header {
  min-height: 60px;
  border-radius: 10px 10px 0px 0px;
}

.bi-three-dots-vertical {
  cursor: pointer;
}

.form-control::placeholder {
  color: white;
}
</style>
