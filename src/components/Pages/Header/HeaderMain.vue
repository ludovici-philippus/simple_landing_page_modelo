<template>
  <q-header elevated height-hint="98">
    <div class="overlay"></div>
    <section class="container header_head flex justify-between q-my-md">
      <q-icon size="128px">
        <Logo />
      </q-icon>
      <div class="flex items-center">
        <q-btn class="cta-button" color="primary" label="Comprar agora" />
      </div>
    </section>
    <section class="container video_call_to_action q-my-xl">
      <hr>
      <div class="q-pa-md flex">
        <q-video :ratio="16 / 9" :src="video" />
      </div>
      <hr>
    </section>
  </q-header>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import Logo from '@components/Icons/Logo.vue'
import { useSiteInfoStore } from 'stores/siteInfoStore.js'

const logo = ref(null)
const video = ref(null)

const header_background_image = (image_name) => {
  return `/imgs/${image_name}`
}

onMounted(async () => {
  const site_info_store = useSiteInfoStore()
  const site_info = await site_info_store.getSiteInfo()

  console.log("SITE INFO: ", site_info)

  document.querySelector('header').style.backgroundImage = header_background_image(site_info.header_bg)
  video.value = site_info.video

})

</script>

<style lang="scss" scoped>
header {
  min-height: 80vh;
  background-image: url('/imgs/bg-header.jpg');
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.header_head {
  position: relative;
  z-index: 2;
}

.video_call_to_action {
  position: relative;
  z-index: 2;
}

.video_call_to_action>div {
  flex-direction: column;
}

.cta-button {
  border-radius: 50px;
}
</style>

