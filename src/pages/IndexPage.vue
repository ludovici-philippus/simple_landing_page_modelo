<template>
  <q-page class="flex flex-center page q-py-xl">
    <section class="q-my-lg">
      <div class="container">
        <h2 class="text-center">Sobre mim</h2>
        <p class="q-mt-md">Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad
          nisi Lorem
          pariatur
          mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum
          Lorem
          est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit
          irure
          elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia
          voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua
          reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea
          consectetur et est culpa et culpa duis.</p>
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
          <TestimonyCard class="w33"
            text="Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."
            name="Ipsum" />
          <TestimonyCard class="w33"
            text="Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."
            name="Ipsum" />
          <TestimonyCard class="w33"
            text="Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."
            name="Ipsum" />
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

<script>
import { defineComponent } from 'vue'
import FlashingButton from '@components/Utils/FlashingButton.vue'
import CtaCarousel from '@components/Utils/CtaCarousel.vue'
import TestimonyCard from '@components/Utils/TestimonyCard.vue'

export default defineComponent({
  name: 'IndexPage',
  components: {
    FlashingButton,
    CtaCarousel,
    TestimonyCard,
  },
  data() {
    return {
      ctas: [
        {
          title: 'Lorem',
          content: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
          button_link: 'https://google.com',
        },
        {
          title: 'Lorem',
          content: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
          button_link: 'https://google.com',
        },
        {
          title: 'Lorem',
          content: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
          button_link: 'https://google.com',
        },
        {
          title: 'Lorem',
          content: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
          button_link: 'https://google.com',
        },
        {
          title: 'Lorem',
          content: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
          button_link: 'https://google.com',
        },
        {
          title: 'Lorem',
          content: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
          button_link: 'https://google.com',
        },
      ]
    }
  }
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
