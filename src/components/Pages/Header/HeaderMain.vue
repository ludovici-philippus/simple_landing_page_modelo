<template>
  <q-header elevated height-hint="98">
    <div class="overlay"></div>
    <section class="container header_head flex">
      <div class="flex w50 header-info">
        <div class="header-logo">
          <q-img width="128px" :src="logo_img" />
        </div>
        <div class="header-content">
          <span class="title_regular">{{ header.site_category }}</span>
          <h1 style="overflow-wrap: anywhere;" class="title_regular q-mt-xl">{{ header.site_name }}</h1>
        </div>
      </div>
      <div v-if="header.header_image.length > 0" class="w50 header-image q-pa-md relative-position">
        <q-img :ratio="1" :src="`${get_image(header.header_image)}`" />
        <div v-if="is_admin" class="buttons absolute-top-right q-mt-md q-mr-md flex column">
          <q-btn @click="removeHeaderImage" round color="red"><q-icon name="remove" /></q-btn>
        </div>
      </div>
      <div v-if="is_admin" class="buttons absolute-top-right q-mt-md q-mr-md flex column">
        <q-btn @click="edit_header.modal = true" round color="white" class="q-mb-sm"><q-icon color="black"
            name="brush" /></q-btn>
      </div>
    </section>

    <section class="container q-my-xl">
      <div v-if="video.length > 0" class="video_call_to_action">
        <hr>
        <div class="q-pa-md flex">
          <q-video :ratio="16 / 9" :src="video" />
        </div>
        <div v-if="is_admin" class="buttons absolute-right flex column">
          <q-btn @click="openEditVideoModal" round color="white" class="q-mb-sm"><q-icon color="black"
              name="brush" /></q-btn>
          <q-btn @click="removeVideo" round color="red"><q-icon name="remove" /></q-btn>
        </div>
        <hr>
      </div>
      <div v-else-if="is_admin" class="add-new-video q-my-md full-height">
        <AddNew class="w100 q-my-lg z-top q-py-md" @action="openAddVideoModal" text="Adicionar vídeo de apresentação" />
      </div>
    </section>

    <q-dialog v-model="edit_video.modal">
      <q-card style="width: 500px; max-width: 80vw;">
        <q-card-section class="text-right">
          <q-btn class="q-mb-md" round color="red" @click="edit_video.modal = false">X</q-btn>
          <q-form greedy @submit="changeVideo" class="q-gutter-md">

            <h4 class="text-center text-black">{{ edit_video.title }}</h4>
            <q-input filled v-model="edit_video.video_link" label="Link do vídeo" :clearable="true" />

            <div>
              <q-btn :label="edit_video.title == 'Editar vídeo' ? 'Editar' : 'Adicionar'" type="submit" color="primary" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="edit_header.modal">
      <q-card style="width: 500px; max-width: 80vw;">
        <q-card-section class="text-right">
          <q-btn class="q-mb-md" round color="red" @click="edit_header.modal = false">X</q-btn>
          <q-form greedy @submit="changeHeader" class="q-gutter-md">

            <h4 class="text-center text-black">Editar informações do cabeçalho</h4>
            <q-input filled v-model="edit_header.site_category" label="Subtítulo do site" :clearable="true" />
            <q-input filled v-model="edit_header.site_name" label="Título do site" :clearable="true" />

            <q-file accept=".jpg, .png, .webp, .jpeg, .gif, image/*" v-model="edit_header.header_image"
              label="Imagem de apresentação" filled :clearable="true" :filter="checkFile" @rejected="onRejected">
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>

            <q-file accept=".jpg, .png, .webp, .jpeg, image/*" v-model="edit_header.header_background_image"
              label="Imagem de fundo" filled :clearable="true" :filter="checkFile" @rejected="onRejected">
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
  </q-header>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUsersStore } from 'stores/usersStore'
import { useSiteInfoStore } from 'stores/siteInfoStore.js'
import { IMAGES_PATH } from '../../../shared/helpers.js'
import AddNew from '@components/Utils/AddNew.vue'

const video = ref('')
const usersStore = useUsersStore()
const site_info_store = useSiteInfoStore()
const { logo } = storeToRefs(site_info_store)
const { is_admin } = storeToRefs(usersStore)

const header = ref({
  site_category: '',
  site_name: '',
  header_image: '',
  header_background_image: '',
})

const edit_video = ref({
  modal: false,
  title: 'Editar Vídeo',
  video_link: '',
})

const edit_header = ref({
  modal: false,
  site_category: '',
  site_name: '',
  header_image: '',
  header_background_image: '',
})

const get_image = (image_name) => {
  return `${IMAGES_PATH()}/${image_name}`
}

onMounted(async () => {
  await updateHeaderInfo()
})

const logo_img = computed(() => {
  if (logo && logo.value) return `${IMAGES_PATH()}/${logo.value}`
  return ''
})

async function updateHeaderInfo() {
  const site_info = await site_info_store.getSiteInfo()
  video.value = site_info.video
  header.value.site_name = site_info.site_name
  header.value.site_category = site_info.site_category
  header.value.header_image = site_info.header_image
  header.value.header_background_image = site_info.header_bg
  document.querySelector('header').style.backgroundImage = `url('${get_image(header.value.header_background_image)}')`
}

function openEditVideoModal() {
  edit_video.value.title = 'Editar vídeo'
  edit_video.value.modal = true
}

function openAddVideoModal() {
  edit_video.value.title = 'Adicionar vídeo'
  edit_video.value.modal = true
}

async function changeVideo() {
  const possible_texts = {
    'Editar vídeo': 'editado',
    'Adicionar vídeo': 'adicionado',
  }
  const video_link = formatVideoLink(edit_video.value.video_link)
  video.value = video_link
  await site_info_store.editVideo(video_link, possible_texts[edit_video.value.title])
}

async function removeVideo() {
  if (await site_info_store.deleteVideo()) video.value = ''
}

async function removeHeaderImage() {
  if (await site_info_store.deleteHeaderImage()) header.value.header_image = ''
}

async function changeHeader() {
  const formData = new FormData()

  formData.append('site_name', edit_header.value.site_name)
  formData.append('site_category', edit_header.value.site_category)
  formData.append('header_bg', edit_header.value.header_background_image)
  formData.append('header_image', edit_header.value.header_image)

  const edited = await site_info_store.editHeaderInfo(formData)
  if (!edited) return;

  updateHeaderInfo()
  edit_header.value = {
    modal: true,
    site_category: '',
    site_name: '',
    header_image: '',
    header_background_image: '',
  }
}

function formatVideoLink(video) {
  let video_link = video
  video_link = video_link.split("&")[0]
  if (video_link.includes("/watch?v=")) {
    const video_id = video_link.split('watch?v=')[1]
    video_link = `https://www.youtube.com/embed/${video_id}`
  } else if (video_link.includes("/youtu.be/")) {
    const video_id = video_link.split('/youtu.be/')[1]
    video_link = `https://www.youtube.com/embed/${video_id}`
  }
  else if (video_link.includes('drive.google.com')) {
    const video_id = video_link.split('file/d/')[1].split('/')[0]
    return `https://drive.google.com/file/d/${video_id}/preview`
  }
  return video_link
}

</script>

<style lang="scss" scoped>
header {
  min-height: 80vh;
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
  margin: 16px auto;
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

.buttons {
  justify-content: center;
}

.add-new-video {
  width: 100%;
  z-index: 2;
}

span.title_regular {
  font-size: 20px;
}

.header-info {

  .header-content {
    max-width: 67%;
    margin-top: 32px;
    margin-left: 32px;
  }
}

@media screen and (max-width: 1100px) {
  .video_call_to_action {
    margin-top: 72px;

    .buttons {
      justify-content: left;
      left: 16px;
      top: -56px;
      flex-direction: row;
      height: 32px;
      margin-left: 16px;

      button {
        margin: 0;
        margin-right: 32px;
        width: 48px;
        height: 48px;
      }
    }

  }

  .header-info {
    width: 100%;

    .header-content {
      max-width: 100%;
      width: 100%;
      text-align: center;
      margin: 0;
    }

  }

  .header-image {
    width: 100%;
  }
}

@media screen and (max-width: 768px) {
  .add-new-video {
    position: relative;
    z-index: 2;
    display: flex;
    width: 100%;
    height: auto;
    top: 0;
    left: 0;
    transform: translate(0, 0);
    margin-bottom: 30px;

  }
}
</style>

