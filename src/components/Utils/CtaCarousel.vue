<template>
  <swiper :slidesPerView="3" :spaceBetween="10" :grabCursor="true" :loop="true" :pagination="{
    clickable: true,
  }" :modules="modules" :navigation="true" class="mySwiper">
    <swiper-slide :key="index" v-for="(cta, index) in ctas">
      <q-card class="cta-card text-white text-center">
        <q-img class="cta-card-img" loading src="https://cdn.quasar.dev/img/mountains.jpg" />

        <q-card-section class="">
          <div class="text-h6">{{ cta.title }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none ">
          {{ cta.content }}
        </q-card-section>

        <q-card-actions class=" w100" align="center">
          <q-btn color="primary" label="Comprar Agora" class="w100 q-pa-md" size="18px" target="_blank"
            :href="cta.button_link" />
        </q-card-actions>
      </q-card>
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default {
  name: "CtaCarousel",
  props: {
    ctas: Array,

  },
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Navigation],
    };
  },
}
</script>

<style lang='scss' >
.cta-card {
  background-color: $dark-page;
  box-shadow: none;
}

.swiper {
  padding: 30px;
}

.cta-card-img .q-img__container img {
  border-radius: 50% !important;
}
</style>
