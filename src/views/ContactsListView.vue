<script setup>

import { ref } from 'vue'

const showFiltersState = ref(false)

const handleFilterState = () => {
  showFiltersState.value = !showFiltersState.value
}

</script>

<template>
  <div class="mx-5 mb-3 d-flex">
    <button @click="handleFilterState" type="button" class="me-3 btn btn-outline-primary">
      <i class="bi bi-filter me-3"></i>
      Filters
      <i :class="[showFiltersState ? 'bi bi-chevron-compact-up' : 'bi bi-chevron-compact-down', 'ms-3']"></i>
    </button>
    <button type="button" class="btn btn-primary"><i class="bi bi-search me-3"></i> Search</button>
  </div>

  <div class="mx-5" v-if="!showFiltersState">
    <div class="d-xl-flex">
      <div class="col-xl-6 col-12">
        <label class="d-block">Contact Name: </label>
        <input placeholder="John Doe" class="form-control py-2" />
      </div>
      <div class="d-sm-flex col-xl-6  mt-3  mt-xl-0 col-12">
        <div class="col-sm-6 col-12 mx-xl-3">
          <label class="d-block">Trading Value Range: </label>
          <div class="w-100 d-flex">
            <input placeholder="From R$ 0,00" class="me-1 form-control py-2" />
            <input placeholder="To R$ 1.000.000" class="ms-1 form-control py-2" />
          </div>
        </div>
        <div class="mt-3 mt-sm-0 col-sm-6 col-12">
          <label class="ms-sm-3 ms-xl-0">Created At: </label>
          <div class=" w-100 d-flex">
            <input placeholder="From 01/01/2024" class="me-1 form-control ms-xl-0 ms-sm-3 py-2" />
            <input placeholder="To 31/12/2024" class="ms-1 form-control py-2" />
          </div>
        </div>
      </div>
    </div>
    <div class="d-xl-flex mt-3">
      <div class="d-sm-flex me-3 col-xl-6 col-12">
        <div class="col-12 col-sm-6">
          <label class="d-block">Contact Company: </label>
          <input placeholder="John Doe Company" class=" form-control py-2" />
        </div>
        <div class="col-12 col-sm-6 mt-3 mt-sm-0">
          <label class="d-block">Contact Number: </label>
          <input placeholder="+55 (XX) 9XXXX-XXXX" class="ms-1 form-control py-2" />
        </div>
      </div>
      <div class="mt-3 mt-xl-0 d-sm-flex col-xl-6 col-12">
        <div class="col-12 col-sm-6">
          <label class="d-block">Contact CNPJ: </label>
          <input placeholder="XX-XXX-XXX/0001-XX" class=" form-control py-2" />
        </div>
        <div class="col-12 col-sm-6">
          <label class="d-block">Contact Funnel: </label>
          <input placeholder="Funnel Example" class="ms-1 form-control py-2" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
label {
  margin-bottom: 10px;
}
</style>
