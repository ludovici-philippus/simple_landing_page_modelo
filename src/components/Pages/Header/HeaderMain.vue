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
        <q-video :ratio="16 / 9" src="https://www.youtube.com/embed/eTfj5Ai6sCA" />
      </div>
      <hr>
    </section>
  </q-header>
</template>

<script>
import Logo from '@components/Icons/Logo.vue'
export default {
  components: {
    Logo,
  },
}
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

