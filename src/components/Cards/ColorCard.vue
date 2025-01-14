<script setup>
defineProps({
  colorData: { type: Object, required: true }
})

</script>

<template>
  <div class="d-flex color-wrapper my-2 align-items-center">
    <div :class="[colorData.color, 'px-2 py-2 me-3 color-container']"></div>
    <p class="m-0"> {{ colorData.name }} </p>
  </div>
</template>

<style scoped>
.color-container {
  border: 1px solid lightgray;
}

.color-wrapper {
  cursor: pointer;
}
</style>
