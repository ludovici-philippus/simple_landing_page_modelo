<template>
  <div>
    <q-footer class="bg-dark text-white justify-center flex items-center q-pa-md">
      <p style="margin: 0">Todos os direitos reservados</p>
      <q-btn v-if="!is_admin" @click="login_modal = true" class="q-ml-md" color="white" text-color="black">Login</q-btn>
      <q-btn-dropdown class="q-ml-md" v-else text-color="black" color="white" label="Opções" dropdown-icon="expand_less">
        <q-list>

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
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUsersStore } from 'stores/usersStore.js'
import { useSiteInfoStore } from 'stores/siteInfoStore'
import { storeToRefs } from 'pinia'
import { LocalStorage } from 'quasar'

const login_modal = ref(false)
const email = ref()
const password = ref()

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

const is_pwd = ref(true)
const users_store = useUsersStore()
const site_info_store = useSiteInfoStore()
const { is_admin } = storeToRefs(users_store)

async function onSubmit() {
  await users_store.login(email.value, password.value)
}

async function onChangeCredentials() {
  await users_store.editCredentials(change_credentials.value.email, change_credentials.value.password)
}

async function changeLogo() {
  const formData = new FormData()

  formData.append('image', change_logo.value.image)

  const changed = await site_info_store.editLogo(formData)
  if (!created) return;

  await site_info_store.getSiteInfo()
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
