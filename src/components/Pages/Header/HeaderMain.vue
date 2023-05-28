<template>
  <q-header elevated height-hint="98">
    <div class="overlay"></div>
    <section class="container header_head flex justify-between q-my-md">
      <q-img width="128px" :src="logo" />
    </section>
    <section v-if="video.length > 0" class="container video_call_to_action q-my-xl">
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
    </section>
    <section style="" class="container add-new-video q-my-md" v-else-if="is_admin">
      <AddNew class="w100 full-height q-mt-lg z-top" @action="openAddVideoModal" text="Adicionar vídeo de apresentação" />
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
  </q-header>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUsersStore } from 'stores/usersStore'
import { useSiteInfoStore } from 'stores/siteInfoStore.js'
import { IMAGES_PATH } from '../../../shared/helpers.js'
import AddNew from '@components/Utils/AddNew.vue'

const logo = ref(null)
const video = ref('')
const usersStore = useUsersStore()
const site_info_store = useSiteInfoStore()
const { is_admin } = storeToRefs(usersStore)

const edit_video = ref({
  modal: false,
  title: 'Editar Vídeo',
  video_link: '',
})


const header_background_image = (image_name) => {
  return `/imgs/${image_name}`
}

onMounted(async () => {
  const site_info = await site_info_store.getSiteInfo()
  logo.value = `${IMAGES_PATH()}/${site_info.logo}`


  document.querySelector('header').style.backgroundImage = header_background_image(site_info.header_bg)
  video.value = site_info.video

})

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
  return video_link
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

.buttons {
  justify-content: center;
}

.add-new-video {
  position: absolute;
  width: 80%;
  height: 60%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

@media screen and (max-width: 1100px) {
  .video_call_to_action {
    margin-top: 72px;

    .buttons {
      justify-content: left;
      left: 50%;
      top: -56px;
      transform: translateX(-50%);
      flex-direction: row;
      height: 32px;
      width: 100%;
      margin-left: 16px;

      button {
        margin: 0;
        margin-right: 32px;
        width: 48px;
        height: 48px;
      }
    }

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

