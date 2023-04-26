<template>
  <q-btn v-if="to" :label="label" :color="color" :size="size" :style="style" :to="to" />
  <q-btn v-else :label="label" :color="color" :size="size" :style="style" :href="href" target="_blank" />
</template>

<script>

import { defineComponent } from 'vue'

export default defineComponent({
  name: "FlashingButton",
  props: {
    label: String,
    color: String,
    flashing_color: String,
    size: String,
    to: String,
    href: String,
  },
  data() {
    return {
      style: `box-shadow: 0px 0px 21px -6px ${this.flashing_color}`
    }
  }
})
</script>

<style lang="scss" scoped>
@keyframes pisca {
  70% {
    box-shadow: 0 0 0 25px #00000000
  }

  100% {
    box-shadow: 0 0 0 0 #00000000
  }
}

a,
button {
  animation: pisca 1.5s infinite;
}
</style>
