<template>
  <section class="w100 q-my-lg">
    <div class="container">
      <h2 class="text-center">Sobre mim <q-btn v-if="is_admin" @click="edit_about_me.modal = true" round color="white"
          class="q-mb-sm"><q-icon color="black" name="brush" /></q-btn></h2>
      <div class="flex justify-between about-me">
        <div :class="{ w50: has_image }">
          <p class="q-mt-md" v-html="about_me"></p>
        </div>
        <div class="w50 relative-position" v-if="has_image">
          <q-img :src="image_about_me" />
          <q-btn class="absolute-right remove-image-button" v-if="is_admin" @click="removeImage" round color="red"><q-icon
              name="remove" /></q-btn>
        </div>
      </div>
    </div>

    <q-dialog v-model="edit_about_me.modal">
      <q-card style="width: 900px; max-width: 80vw;">
        <q-card-section class="text-right">
          <q-btn class="q-mb-md" round color="red" @click="edit_about_me.modal = false">X</q-btn>
          <q-form greedy @submit="changeAboutMe" class="q-gutter-md about-me-form">

            <h4 class="text-center text-black">Editar sobre mim</h4>
            <q-editor class="about-me-edit" v-model="edit_about_me.text" min-height="5rem" />
            <q-file accept=".jpg, .png, .webp, .jpeg, image/*" v-model="edit_about_me.image" label="Imagem lateral" filled
              :clearable="true" :filter="checkFile" @rejected="onRejected">
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>

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
import { ref, defineProps, watch, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { IMAGES_PATH } from 'src/shared/helpers';

const site_info = useSiteInfoStore()
const { about_me, image } = storeToRefs(site_info)
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
  image: '',
})

onMounted(() => {
  temp_about_me.value = site_info.about_me
})

watch(about_me, (new_value) => {
  if (new_value) {
    edit_about_me.value.text = new_value
  }
})

const image_about_me = computed(() => {
  if (image && image.value) return `${IMAGES_PATH()}/${image.value}`
  return ''
})

const has_image = computed(() => {
  if (image && image.value && image.value.length > 0) return true
  return false
})

async function changeAboutMe() {
  const formData = new FormData()

  formData.append('about_me', edit_about_me.value.text)
  formData.append('image', edit_about_me.value.image)

  const created = await site_info.editAboutMe(formData)
  if (!created) return

  await site_info.getSiteInfo()
}

async function removeImage() {
  const deleted = await site_info.deleteAboutMeImage()
  if (!deleted) return

  await site_info.getSiteInfo()
}

function checkFile(files) {
  const allow_types = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/jpeg',
    'image/webp',
  ]
  return files.filter(file => file.size < 1024 * 1000 && (allow_types.includes(file.type)))
}

function onRejected(rejectedEntries) {

  Notify.create({
    type: 'negative',
    message: `Arquivo inválido! Verifique se o arquivo não ultrapassa o tamanho máximo (1 mb) e se ele é um formato válido de imagem`
  })
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
.remove-image-button {
  width: 48px;
  height: 48px;
}

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
