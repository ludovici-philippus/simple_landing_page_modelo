<template>
  <q-card class="cta-card text-black bg-white q-pa-md">
    <q-icon name="fa-solid fa-quote-left" color="primary" size="48px" />
    <q-card-section class="bg-white text-center">
      "{{ text }}"
    </q-card-section>

    <q-card-section class="q-pt-none bg-white text-primary text-center">
      <div class="text-h6">- {{ name }}</div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "CtaCard",
  props: {
    text: String,
    name: String,
  }
}
</script>

<style lang='scss' scoped></style>
