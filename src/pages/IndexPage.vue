<template>
  <q-page class="flex flex-center page q-py-xl">
    <section class="q-my-lg">
      <div class="container">
        <h2 class="text-center">Sobre mim</h2>
        <p class="q-mt-md">{{ about_me }}</p>
      </div>
    </section>

    <section class="q-my-lg w100">
      <div class="container w100">
        <h2 class="text-center">Projetos</h2>
        <div class="products flex justify-between w100 q-mt-lg">
          <CtaCarousel class="" :ctas="ctas" />
        </div>
      </div>
    </section>

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
import CtaCarousel from '@components/Utils/CtaCarousel.vue'
import TestimonyCard from '@components/Utils/TestimonyCard.vue'
import { useSiteInfoStore } from 'stores/siteInfoStore.js'
import { useProductsStore } from 'stores/productsStore.js'
import { useTestimoniesStore } from 'stores/testimoniesStore.js'

const site_info = useSiteInfoStore()
const products_store = useProductsStore()
const testimonies_store = useTestimoniesStore()
const { about_me } = storeToRefs(site_info)

const ctas = ref([])
const testimonies = ref([])

onMounted(async () => {
  const products = await products_store.getProducts()
  const fetched_testimonies = await testimonies_store.getTestimonies()

  ctas.value = products
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
</style>
