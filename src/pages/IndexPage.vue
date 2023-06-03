<template>
  <q-page class="flex flex-center page q-py-xl">
    <AboutMe :is_admin="is_admin" />
    <ProductsComponent :is_admin="is_admin" />
    <TestimoniesComponent :is_admin="is_admin" />
  </q-page>
</template>

<script setup>
import { storeToRefs } from 'pinia'
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
