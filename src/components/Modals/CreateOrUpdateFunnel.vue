<script setup>
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { toastManagementStore } from '@/stores/toastManagement.ts'
import { funnelsManagementStore } from '@/stores/funnelsManagement.ts'
import { modalsManagementStore } from '@/stores/modalsManagement.ts'
import { computed, ref, watch } from 'vue'
import { userConfigStore } from '@/stores/userConfigManagement.ts'

const toastManagement = toastManagementStore()
const funnelsManagement = funnelsManagementStore()
const modalsManagement = modalsManagementStore()
const modalsData = computed(() => modalsManagement.modalData)
const userStore = userConfigStore()
const userColorData = userStore.userColorData
const funnelMockUp = ref({})
const editMode = ref(false)

const validationSchema = {
  name: yup.string().required("Title field can't be empty")
    .max(20, "Title field reached max size"),
  description: yup.string().required("The Description field can't be empty")
    .max(100, "Description fiel reached max size")

}
const { defineField, values, validate, setValues } = useForm({
  validationSchema
})
const [ name ] = defineField('name')
const [ description ] = defineField('description')

const setNewValues = (newValue) => {
  setValues({
    name: newValue.name,
    description: newValue.description
  })
}


const createFunnel = async () => {
  const isValid = await validate()
  if(!isValid.valid) {
    if (isValid.errors.name) {
      toastManagement.errorToast(isValid.errors.name)
      return
    }
    toastManagement.errorToast(isValid.errors.description)

    return
  }

  await funnelsManagement.createFunnel(values)
  toastManagement.succesToast("Funnel Created")
  setNewValues( { name: '', description: '' } )
  handleModalState()
}

const editFunnel = async () => {
  const isValid = await validate()
  if(!isValid.valid) {
    if (isValid.errors.name) {
      toastManagement.errorToast(isValid.errors.name)
      return
    }
    toastManagement.errorToast(isValid.errors.description)

    return
  }

  funnelMockUp.value.name = name.value
  funnelMockUp.value.description = description.value

  funnelsManagement.editFunnel(funnelMockUp.value)
  handleModalState()
}

const deleteFunnel = () => {
  funnelsManagement.deleteFunnel(funnelMockUp.value)
  handleModalState()
}

const handleModalState = () => {
  modalsManagement.handleModalState()
}

watch(modalsData, (newValue) => {
  if (newValue.modalData.dataType === 'funnel') {
    funnelMockUp.value = newValue.modalData.funnelData
    setNewValues({ name: funnelMockUp.value.name, description: funnelMockUp.value.description })
    editMode.value = true

    return
  }
  setNewValues( { name: '', description: '' } )
  editMode.value =  false
}, { deep: true });
</script>

<template>
    <div :class="['modal fade show modal-background', modalsData.modalView === 'CreateOrUpdateFunnel' ? 'd-block' : '']" tabindex="-1" >
      <div class="modal-dialog modal-lg modal-dialog-centered w-100">
        <div class="modal-content px-4 py-3">
          <div class="modal-header">
            <h5 class="modal-title">Create Funnel</h5>
            <button @click="handleModalState" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div>
              <label class="mb-2">Modal Name</label>
              <input v-model="name" class="form-control" placeholder="Funnel Example" />
            </div>
            <div class="mt-4">
              <label class="mb-2"> Descrição </label>
              <textarea v-model="description" rows="5" placeholder="Funnel created to handle urgent sales" class="form-control" />
            </div>
          </div>
          <div class="modal-footer">
            <button
              @click="deleteFunnel"
              v-if="editMode"
              type="button" class="btn btn-secondary bg-danger border-0" data-bs-dismiss="modal">Delete</button>
            <button
              @click="editMode ? editFunnel() : createFunnel()"
              type="button"
              :class="['btn border-0', userColorData.btn]">
              {{ editMode ? 'Edit' : 'Create' }} </button>
          </div>
        </div>
      </div>
    </div>
</template>

<style>
</style>
