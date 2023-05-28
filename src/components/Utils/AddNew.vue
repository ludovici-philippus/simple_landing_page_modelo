<template>
  <q-btn flat @click="$emit('action')" class="w33">
    <div class="flex column justify-center items-center card-container">
      <q-icon size="48px" name="add" />
      <h4>{{ text }}</h4>
    </div>
  </q-btn>
</template>

<script setup>
defineProps({
  text: String,
  action: Function,
})

</script>

<style lang="scss" scoped>
.card-container {
  border: 3px dashed #333;
  padding: 20px;
  height: 100%;
  width: 100%;

  h4 {
    font-size: 24px;
  }
}
</style>
