<script setup>
const props = defineProps({
  isModalVisible: { type: Boolean }
})
</script>

<template>
  <div class="modal fade" tabindex="-1" v-if="isModalVisible" @click.self="closeModal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Título do Modal</h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <p>Conteúdo do modal.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">Fechar</button>
          <button type="button" class="btn btn-primary" @click="closeModal">Salvar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

</style>
