<template>
  <q-card class="cta-card text-black bg-white q-pa-md">
    <div v-if="is_admin" class="buttons absolute-left flex row">
      <q-btn @click="$emit('openEditTestimony', id, text, name)" round color="white" class="q-mb-sm"><q-icon color="black"
          name="brush" /></q-btn>
      <q-btn @click="$emit('deleteTestimony', id)" round color="red"><q-icon name="remove" /></q-btn>
    </div>
    <q-icon name="fa-solid fa-quote-left" color="primary" size="48px" />
    <q-card-section class="bg-white text-center">
      "{{ text }}"
    </q-card-section>

    <q-card-section class="q-pt-none bg-white text-primary text-center">
      <div class="text-h6">- {{ name }}</div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue'

const props = defineProps({
  text: String,
  name: String,
  id: Number,
  is_admin: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang='scss' scoped>
.buttons {
  z-index: 2;
  justify-content: right;
  top: -32px;

  button {
    margin: 0;
    margin-right: 16px;
    width: 48px;
    height: 48px;
  }
}
</style>
