<template>
  <q-layout view="lhh Lpr lff">
    <HeaderMain />

    <q-page-container>
      <router-view />
    </q-page-container>

    <FooterMain />
  </q-layout>
</template>

<script setup>
import { onMounted } from 'vue'
import HeaderMain from '@components/Pages/Header/HeaderMain.vue'
import FooterMain from '@components/Pages/Footer/FooterMain.vue'
import { useUsersStore } from 'stores/usersStore.js'

const usersStore = useUsersStore()
onMounted(async () => {
  await usersStore.getMe()
})

</script>

<style lang="scss" scoped></style>
