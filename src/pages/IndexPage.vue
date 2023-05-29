<template>
  <q-page class="flex flex-center page q-py-xl">
    <AboutMe :is_admin="is_admin" />
    <ProductsComponent :is_admin="is_admin" />
    <TestimoniesComponent :is_admin="is_admin" />

    <section class="q-mt-md w100">
      <div class="container flex justify-center">
        <FlashingButton class="cta-button" size="28px" label="Comprar agora" color="primary" flashing_color="#8D09C4"
          href="https://duckduckgo.com" />
      </div>
    </section>

  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import FlashingButton from '@components/Utils/FlashingButton.vue'
import AboutMe from '@components/Pages/AboutMe.vue'
import ProductsComponent from '@components/Pages/ProductsComponent.vue'
import TestimoniesComponent from '@components/Pages/TestimoniesComponent.vue'

import { useUsersStore } from 'stores/usersStore'

const { is_admin } = storeToRefs(useUsersStore())

</script>

<style lang="scss" scoped>
.page {
  flex-direction: column;
}

.cta-button {
  border-radius: 50px;
}

.gallery {
  display: flex;
  height: 20rem;
  gap: 1rem;
}

.buttons {
  justify-content: right;

  button {
    margin: 0;
    margin-right: 16px;
    width: 48px;
    height: 48px;
  }
}
</style>
