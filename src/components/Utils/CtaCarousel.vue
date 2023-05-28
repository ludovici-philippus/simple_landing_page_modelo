<template>
  <swiper :slidesPerView="slidesPerView" :spaceBetween="10" :grabCursor="true" :loop="true" :pagination="{
    clickable: true,
  }" :modules="modules" :navigation="true" class="mySwiper">
    <swiper-slide :key="index" v-for="(cta, index) in ctas">
      <q-card class="cta-card full-height flex column justify-between text-white text-center w100">
        <div v-if="is_admin" class="buttons z-top absolute-left flex column">
          <q-btn @click="$emit('editProduct', cta.id)" round color="white" class="q-mb-sm"><q-icon color="black"
              name="brush" /></q-btn>
          <q-btn @click="$emit('deleteProduct', cta.id)" round color="red"><q-icon name="remove" /></q-btn>
        </div>

        <q-img style="height: 200px" class="w100 cta-card-img" loading :src="`${images_path}/${cta.image}`" />

        <q-card-section class="w100">
          <div class="text-h6">{{ cta.title }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none w100">
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
import { IMAGES_PATH } from 'src/shared/helpers';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default {
  name: "CtaCarousel",
  props: {
    ctas: Array,
    is_admin: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      images_path: IMAGES_PATH()
    }
  },
  emits: ['editProduct', 'deleteProduct'],
  mounted() {
    this.setCtaCardWidth()
  },
  watch: {
    ctas() { this.setCtaCardWidth() }
  },
  methods: {
    setCtaCardWidth() {
      const sizes = {
        1: '20%',
        2: '40%',
        3: '60%',
        4: '80%',
      }
      const percentage = sizes[this.ctas.length] || '100%'
      document.querySelector('.cta-card')?.setAttribute('width', percentage)
    }
  },
  computed: {
    slidesPerView() {
      if (window.innerWidth < 768) return 1
      return this.ctas.length > 5 ? 3 : this.ctas.length
    }
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

<style lang="scss" scoped>
@media screen and (max-width: 768px) {
  .buttons {
    flex-direction: row;
    width: 100%;

    button {
      margin: 0;
      margin-right: 16px;
      width: 48px;
      height: 48px;
    }
  }
}
</style>
