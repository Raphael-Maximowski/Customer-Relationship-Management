<script setup>
import { computed, onMounted, ref } from 'vue'
import { toastManagementStore } from '@/stores/toastManagement.ts'
import { stepsManagementStore } from '@/stores/stepsManagement.ts'
import { contactsManagementStore } from '@/stores/contactsManagement.ts'
import ContactCard from '@/components/Cards/ContactCard.vue'
import EmptyStepCard from '@/components/Cards/EmptyStepCard.vue'
import draggable from 'vuedraggable'

const props = defineProps({
  stepInfo: { type: Object, required: true }
})

const stepsManagement = stepsManagementStore()
const toastManagement = toastManagementStore()
const contactsStore = contactsManagementStore()
const contactsData = contactsStore.getFilteredContacts(props.stepInfo.id)
const newStepName = ref('')
const editStepState = ref(false)

const log = (evt) => {

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
  stepsManagement.deleteStep(props.stepInfo.id)
  handleEditStepState()
}

const handleEditStepState = () => {
  editStepState.value = !editStepState.value
}

</script>

<template>
  <div class="steps-container col-2 mx-5 d-flex flex-column   h-100">
    <div class="px-3  steps-header d-flex text-white align-items-center justify-content-between  w-100 bg-primary">
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
      <EmptyStepCard v-if="contactsData.length === 0" />
      <draggable
        v-model="contactsData"
        group="contactsData"

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
  min-width: 300px;
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
