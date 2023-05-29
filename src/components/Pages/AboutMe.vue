<template>
  <section class="w100 q-my-lg">
    <div class="container">
      <h2 class="text-center">Sobre mim <q-btn v-if="is_admin" @click="edit_about_me.modal = true" round color="white"
          class="q-mb-sm"><q-icon color="black" name="brush" /></q-btn></h2>
      <p class="q-mt-md" v-html="about_me"></p>
    </div>

    <q-dialog v-model="edit_about_me.modal">
      <q-card style="width: 900px; max-width: 80vw;">
        <q-card-section class="text-right">
          <q-btn class="q-mb-md" round color="red" @click="edit_about_me.modal = false">X</q-btn>
          <q-form greedy @submit="changeAboutMe" class="q-gutter-md about-me-form">

            <h4 class="text-center text-black">Editar sobre mim</h4>
            <q-editor class="about-me-edit" v-model="edit_about_me.text" min-height="5rem" />

            <div>
              <q-btn label="Editar" type="submit" color="primary" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </section>
</template>

<script setup>
import { useSiteInfoStore } from 'stores/siteInfoStore.js'
import { ref, onMounted, defineProps, watch } from 'vue'
import { storeToRefs } from 'pinia'

const site_info = useSiteInfoStore()
const { about_me } = storeToRefs(site_info)
const props = defineProps({
  is_admin: {
    type: Boolean,
    default: false
  }
})

const temp_about_me = ref('')
const edit_about_me = ref({
  modal: false,
  text: temp_about_me,
})

onMounted(() => {
  temp_about_me.value = site_info.about_me

})

watch(about_me, (new_value) => {
  if (new_value) {
    temp_about_me.value = new_value
  }
})

async function changeAboutMe() {
  if (await site_info.editAboutMe(edit_about_me.value.text)) site_info.about_me = edit_about_me.value.text
}

</script>

<style lang="scss">
.about-me-form {
  .about-me-edit {
    .q-editor__content {

      p,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        color: black !important;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
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
