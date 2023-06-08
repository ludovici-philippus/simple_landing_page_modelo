<template>
  <div>
    <q-footer class="bg-dark text-white justify-between flex items-center q-pa-md">
      <div class="w33"></div>
      <div class='w33 flex items-center justify-center'>
        <p style="margin: 0">Todos os direitos reservados</p>
        <q-btn v-if="!is_admin" @click="login_modal = true" class="q-ml-md" color="white" text-color="black">Login</q-btn>
        <q-btn-dropdown class="q-ml-md" v-else text-color="black" color="white" label="Opções"
          dropdown-icon="expand_less">
          <q-list>

            <q-item clickable v-close-popup @click="change_labels.modal = true">
              <q-item-section>
                <q-item-label>Alterar subtítulos</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="edit_social_midias.modal = true">
              <q-item-section>
                <q-item-label>Alterar links das redes sociais</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="change_logo.modal = true">
              <q-item-section>
                <q-item-label>Alterar logomarca</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="change_credentials.modal = true">
              <q-item-section>
                <q-item-label>Alterar informações de acesso</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="signOut">
              <q-item-section>
                <q-item-label>Deslogar</q-item-label>
              </q-item-section>
            </q-item>

          </q-list>
        </q-btn-dropdown>
      </div>
      <div class="w33 flex justify-center">
        <q-btn class="q-mr-md" color="primary" target="_blank" round
          v-if="social_midias.instagram && social_midias.instagram.length > 0" :href="social_midias.instagram">
          <q-icon name="fa-solid fa-brands fa-instagram" />
        </q-btn>
        <q-btn class="q-mr-md" color="primary" target="_blank" round
          v-if="social_midias.whatsapp && social_midias.whatsapp.length > 0" :href="social_midias.whatsapp_url">
          <q-icon name="fa-solid fa-brands fa-whatsapp" />
        </q-btn>
        <q-btn color="primary" target="_blank" round v-if="social_midias.facebook && social_midias.facebook.length > 0"
          :href="social_midias.facebook">
          <q-icon name="fa-solid fa-brands fa-facebook" />
        </q-btn>
      </div>
    </q-footer>

    <q-dialog v-model="login_modal">
      <q-card style="width: 500px; max-width: 80vw;">
        <q-card-section class="text-right">
          <q-btn class="q-mb-md" round color="red" @click="login_modal = false">X</q-btn>
          <q-form greedy @submit="onSubmit" class="q-gutter-md">

            <h4 class="text-center text-black">Login</h4>
            <q-input lazy-rules v-model="email" filled type="email" hint="Seu e-mail" placeholder="E-mail*"
              :rules="[val => val && val.length > 0 || 'Por favor, escreva algo']" />

            <q-input lazy-rules v-model="password" filled :type="is_pwd ? 'password' : 'text'" hint="Sua senha"
              placeholder="Senha*" :rules="[val => val && val.length > 0 || 'Por favor, escreva algo']">
              <template v-slot:append>
                <q-icon :name="is_pwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                  @click="is_pwd = !is_pwd" />
              </template>
            </q-input>


            <div>
              <q-btn type="submit" label="Entrar" color="primary" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="change_credentials.modal">
      <q-card style="width: 500px; max-width: 80vw;">
        <q-card-section class="text-right">
          <q-btn class="q-mb-md" round color="red" @click="change_credentials.modal = false">X</q-btn>
          <q-form greedy @submit="onChangeCredentials" class="q-gutter-md">

            <h4 class="text-center text-black">Alterar informações de acesso</h4>
            <q-input lazy-rules v-model="change_credentials.email" filled type="email" hint="Novo e-mail"
              placeholder="E-mail*" :rules="[val => val && val.length > 0 || 'Por favor, escreva algo']" />

            <q-input lazy-rules v-model="change_credentials.password" filled
              :type="change_credentials.is_pwd ? 'password' : 'text'" hint="Nova senha" placeholder="Senha*"
              :rules="[val => val && val.length > 0 || 'Por favor, escreva algo']">
              <template v-slot:append>
                <q-icon :name="change_credentials.is_pwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                  @click="change_credentials.is_pwd = !change_credentials.is_pwd" />
              </template>
            </q-input>


            <div>
              <q-btn type="submit" label="Alterar Credenciais" color="primary" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="edit_social_midias.modal">
      <q-card style="width: 500px; max-width: 80vw;">
        <q-card-section class="text-right">
          <q-btn class="q-mb-md" round color="red" @click="edit_social_midias.modal = false">X</q-btn>
          <q-form greedy @submit="editSocialMidias" class="q-gutter-md">

            <h4 class="text-center text-black">Alterar links de redes sociais</h4>
            <q-input lazy-rules v-model="edit_social_midias.instagram" filled
              hint="Novo perfil do instagram (Deixe vazio para remover o botão)" placeholder="Instagram" />

            <q-input lazy-rules mask="+## (##) # ####-####" v-model="edit_social_midias.whatsapp" filled
              hint="Novo número do whatsapp (Deixe vazio para remover o botão)" placeholder="Whatsapp" />

            <q-input lazy-rules v-model="edit_social_midias.facebook" filled
              hint="Novo perfil do facebook (Deixe vazio para remover o botão)" placeholder="Facebook" />

            <q-input lazy-rules v-model="edit_social_midias.whatsapp_text" type="textarea" filled
              hint="Mensagem do botão de whatsapp" placeholder="Mensagem do whatsapp" />

            <div>
              <q-btn type="submit" label="Editar" color="primary" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="change_logo.modal">
      <q-card style="width: 500px; max-width: 80vw;">
        <q-card-section class="text-right">
          <q-btn class="q-mb-md" round color="red" @click="change_logo.modal = false">X</q-btn>
          <q-form greedy @submit="changeLogo" class="q-gutter-md">

            <h4 class="text-center text-black">Alterar logomarca</h4>
            <q-file accept=".jpg, .png, .webp, .jpeg, image/*" v-model="change_logo.image" label="Imagem do produto"
              filled :clearable="true" :filter="checkFile" @rejected="onRejected">
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

    <q-dialog v-model="change_labels.modal">
      <q-card style="width: 500px; max-width: 80vw;">
        <q-card-section class="text-right">
          <q-btn class="q-mb-md" round color="red" @click="change_labels.modal = false">X</q-btn>
          <q-form greedy @submit="changeLabels" class="q-gutter-md">

            <div class="text-center">
              <h5 class="text-center text-black">Título da seção sobre</h5>
              <q-radio v-model="change_labels.about_me_label" val="Sobre mim" label="Sobre mim" />
              <q-radio v-model="change_labels.about_me_label" val="Sobre nós" label="Sobre nós" />
            </div>

            <div class="text-center">
              <h5 class="text-center text-black">Título da seção de chamada pra ação</h5>
              <q-radio v-model="change_labels.products_label" val="Produtos" label="Produtos" />
              <q-radio v-model="change_labels.products_label" val="Serviços" label="Serviços" />
            </div>

            <div>
              <q-btn label="Editar" type="submit" color="primary" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUsersStore } from 'stores/usersStore.js'
import { useSiteInfoStore } from 'stores/siteInfoStore.js'
import { useSocialMidiasStore } from 'stores/socialMidiasStore.js'
import { useConfigsStore } from 'stores/configsStore'
import { storeToRefs } from 'pinia'
import { LocalStorage } from 'quasar'

const login_modal = ref(false)
const email = ref()
const password = ref()
const products_label = ref('Produtos')
const about_me_label = ref('Sobre mim')
const configs_store = useConfigsStore()

const change_credentials = ref({
  modal: false,
  email: '',
  password: '',
  is_pwd: true,
})

const change_logo = ref({
  modal: false,
  image: null,
})

const social_midias = ref({
  instagram: '',
  whatsapp: '',
  whatsapp_url: '',
  facebook: '',
  whatsapp_text: '',
})

const edit_social_midias = ref({
  modal: false,
  instagram: '',
  whatsapp: '',
  facebook: '',
  whatsapp_text: '',
})

const change_labels = ref({
  modal: false,
  products_label: products_label.value,
  about_me_label: about_me_label.value,
})

const is_pwd = ref(true)
const users_store = useUsersStore()
const site_info_store = useSiteInfoStore()
const social_midias_store = useSocialMidiasStore()
const { is_admin } = storeToRefs(users_store)

onMounted(async () => {
  await updateSocialMidias()

  about_me_label.value = await configs_store.getAboutMeLabel()
  products_label.value = await configs_store.getProductLabel()

  change_labels.value.about_me_label = about_me_label.value
  change_labels.value.products_label = products_label.value
})

async function updateSocialMidias() {
  const midias = await social_midias_store.getSocialMidias()

  social_midias.value.instagram = midias.instagram
  social_midias.value.whatsapp = midias.whatsapp
  social_midias.value.whatsapp_url = midias.whatsapp_url
  social_midias.value.whatsapp_text = midias.whatsapp_text
  social_midias.value.facebook = midias.facebook

  setEditSocialMediasFields()
}

function setEditSocialMediasFields() {
  edit_social_midias.value.instagram = social_midias.value.instagram?.split("https://instagram.com/")[1]
  edit_social_midias.value.whatsapp = social_midias.value.whatsapp
  edit_social_midias.value.whatsapp_text = social_midias.value.whatsapp_text
  edit_social_midias.value.facebook = social_midias.value.facebook?.split("https://facebook.com/")[1]
}

async function onSubmit() {
  await users_store.login(email.value, password.value)
}

async function onChangeCredentials() {
  await users_store.editCredentials(change_credentials.value.email, change_credentials.value.password)
}

async function editSocialMidias() {
  await social_midias_store.editSocialMidias(
    edit_social_midias.value.instagram,
    edit_social_midias.value.whatsapp,
    edit_social_midias.value.facebook,
    edit_social_midias.value.whatsapp_text,
  )
  await updateSocialMidias()
}

async function changeLogo() {
  const formData = new FormData()

  formData.append('image', change_logo.value.image)

  const changed = await site_info_store.editLogo(formData)
  if (!changed) return;

  await site_info_store.getSiteInfo()
}

async function changeLabels() {
  const new_about_me = change_labels.value.about_me_label
  const new_product = change_labels.value.products_label

  if (new_product != products_label.value) await configs_store.editProductLabel(new_product)
  else if (new_about_me != about_me_label.value) await configs_store.editAboutMeLabel(new_about_me)

  about_me_label.value = await configs_store.getAboutMeLabel()
  products_label.value = await configs_store.getProductLabel()
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

function signOut() {
  LocalStorage.remove('user_token')
  window.location.reload()
}
</script>

<style></style>
