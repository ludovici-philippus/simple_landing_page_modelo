<template>
  <q-layout view="lhh Lpr lff">
    <HeaderMain />

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-dark text-white justify-center flex align-center q-pa-md">
      <p style="margin: 0">Todos os direitos reservados</p>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import HeaderMain from '@components/Pages/Header/HeaderMain.vue'

export default defineComponent({
  name: 'MainLayout',
  components: {
    HeaderMain,
  }
})
</script>

<style lang="scss" scoped></style>
