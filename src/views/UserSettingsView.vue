<script setup>

import { computed, onMounted, ref } from 'vue'
import ColorCard from '@/components/Cards/ColorCard.vue'
import { userConfigStore } from '@/stores/userConfigManagement.ts'

const userConfig = userConfigStore()
const userColorData = computed(() => userConfig.userColorData)

const userNameConfig = computed(() => userConfig.userName)
const userMessageConfig = computed(() => userConfig.userMessageToSend)

const userMessageMockUp = userMessageConfig.value
const userMockUp = userNameConfig.value
const userColorsMockUp = ref({
  backgroundColor: userColorData.value.name,
  textColor: userColorData.value.textName
})

const userName = ref('')
const userMessage = ref('')

const backgroundDropDownState = ref(false)
const textDropDownState = ref(false)
const newBackgroundColor = ref({})
const newTextColor = ref({})

const handleBackgroundDropDownColor = () => {
  textDropDownState ? textDropDownState.value = false : ''
  backgroundDropDownState.value = !backgroundDropDownState.value
}

const handleTextDropDownColor = () => {
  backgroundDropDownState ? backgroundDropDownState.value = false : ''
  textDropDownState.value = !textDropDownState.value
}

const saveChanges = () => {

  userName.value != userMockUp ? userConfig.setUserName(userName.value) : ''
  userMessage.value != userMessageMockUp ? userConfig.setMessageToSend(userMessage.value) : ''

  newBackgroundColor.value.name != userColorsMockUp.value.backgroundColor
  || newTextColor.value.textName != userColorsMockUp.value.textColor ?
    dispatchNewColors() : ''
}

const dispatchNewColors = () => {
  userConfig.setUserColors(newBackgroundColor.value)
  userConfig.setUserColors(newTextColor.value)
}

const textColors = ref([
  { text: 'text-primary', textName: 'Blue' },
  { text: 'text-success', textName: 'Green' },
  { text: 'text-danger', textName: 'Red' },
  { text: 'text-warning', textName: 'Yellow' },
  { text: 'text-info', textName: 'Light Blue' },
  { text: 'text-dark', textName: 'Dark' }
])

const backgroundColors = ref([
  { color: 'bg-primary', name: 'Blue', btn: 'btn-primary', emptyBtn: 'btn-outline-primary', hexa: '#0D6EFC' },
  { color: 'bg-success', name: 'Green', btn: 'btn-success', emptyBtn: 'btn-outline-success', hexa: '#198553' },
  { color: 'bg-danger', name: 'Red', btn: 'btn-danger', emptyBtn: 'btn-outline-danger', hexa: '#D93444' },
  { color: 'bg-warning', name: 'Yellow', btn: 'btn-warning', emptyBtn: 'btn-outline-warning', hexa: '#FFC107' },
  { color: 'bg-info', name: 'Light Blue', btn: 'btn-info', emptyBtn: 'btn-outline-info', hexa: '#0DCAF0' },
  { color: 'bg-dark', name: 'Dark', btn: 'btn-dark', emptyBtn: 'btn-outline-dark', hexa: '#212529' }
])

const setNewBackgroundColor = (newBackgroundColorIncome) => {
  newBackgroundColor.value = newBackgroundColorIncome
  handleBackgroundDropDownColor()
}

const setNewTextColor = (newTextColorIncome) => {
  newTextColor.value = newTextColorIncome
  handleTextDropDownColor()
}

onMounted(() => {
  userName.value = userNameConfig.value
  userMessage.value = userMessageConfig.value
  newBackgroundColor.value.name = userColorsMockUp.value.backgroundColor
  newTextColor.value.textName = userColorsMockUp.value.textColor
})
</script>

<template>
  <div class="w-100 h-100 d-flex">
    <div class="mx-5 d-lg-flex w-100 mb-5">
      <div class="d-flex flex-column col-12 col-lg-6 me-3">
        <div class="position-relative">
          <label class="mb-2 fw-bold">System Background Color</label>
          <input @click="handleBackgroundDropDownColor" :placeholder="newBackgroundColor.name" class="form-select" readonly/>

          <div
            v-if="backgroundDropDownState"
            class="mt-2 py-2 px-3 z-3 rounded-2 position-absolute bg-white w-100">
            <div
              v-for="colorData in backgroundColors"
              :key="colorData.name"
              @click="setNewBackgroundColor(colorData)"
            >
              <ColorCard :colorData="colorData"/>
            </div>
          </div>
        </div>
        <div class="position-relative">
          <label class="mt-4 mb-2 fw-bold">System Text Color</label>
          <input @click="handleTextDropDownColor" :placeholder="newTextColor.textName" class="form-select" readonly/>

          <div
            v-if="textDropDownState"
            class="mt-2 py-2 px-3 z-3 rounded-2 position-absolute bg-white w-100">
            <div
              @click="setNewTextColor(colorData)"
              class="d-flex align-items-center my-2 text-colors"
              v-for="colorData in textColors"
              :key="colorData.textName"
            >
              <input :checked="colorData.textName == newTextColor.textName" type="checkbox" class="me-3"/>
              <p :class="[colorData.text, 'm-0']">{{ colorData.textName }}</p>
            </div>
          </div>
        </div>
        <div class="mt-4 d-none d-lg-block">
          <button @click="saveChanges" type="button" :class="['px-5 btn', userColorData.btn]">Save Changes</button>
        </div>
      </div>
      <div class="col-12 col-lg-6 h-100 mt-3 mt-lg-0">
        <label class="mb-2 fw-bold">User Name</label>
        <input v-model="userName" class="form-control" placeholder="Insert your Name"/>
        <label class="mt-4 mb-2 fw-bold">Default Message Sent</label>
        <input v-model="userMessage" class="form-control" placeholder="Insert the message Sent by WhatsApp"/>

        <div class="mt-4 d-lg-none d-block">
          <button @click="saveChanges" type="button" :class="['px-5 btn', userColorData.btn]">Save Changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-colors {
  cursor: pointer;
}
</style>
