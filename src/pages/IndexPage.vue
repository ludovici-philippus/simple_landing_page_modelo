<template>
  <q-page class="flex flex-center page q-py-xl">
    <AboutMe :is_admin="is_admin" />
    <ProductsComponent :is_admin="is_admin" />

    <section class="q-my-lg w100">
      <div class="container w100">
        <h2 class="text-center">Depoimentos</h2>
        <div class="products flex justify-between w100 q-mt-lg">
          <TestimonyCard v-for="testimony in testimonies" :key="testimony.id" class="w33" :text="testimony.text"
            :name="testimony.name" />
        </div>
      </div>
    </section>

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
import TestimonyCard from '@components/Utils/TestimonyCard.vue'
import AboutMe from '@components/Pages/AboutMe.vue'
import ProductsComponent from '@components/Pages/ProductsComponent.vue'
import { useTestimoniesStore } from 'stores/testimoniesStore.js'
import { useUsersStore } from 'stores/usersStore'

const testimonies_store = useTestimoniesStore()
const { is_admin } = storeToRefs(useUsersStore())

const testimonies = ref([])


onMounted(async () => {
  const fetched_testimonies = await testimonies_store.getTestimonies()

  testimonies.value = fetched_testimonies
})

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
