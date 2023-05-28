<template>
  <div>
    <q-footer class="bg-dark text-white justify-center flex items-center q-pa-md">
      <p style="margin: 0">Todos os direitos reservados</p>
      <q-btn v-if="!is_admin" @click="login_modal = true" class="q-ml-md" color="white" text-color="black">Login</q-btn>
      <q-btn-dropdown class="q-ml-md" v-else text-color="black" color="white" label="Opções" dropdown-icon="expand_less">
        <q-list>

          <q-item clickable v-close-popup @click="change_password_modal = true">
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
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUsersStore } from 'stores/usersStore.js'
import { storeToRefs } from 'pinia'

const login_modal = ref(false)
const email = ref()
const password = ref()
const is_pwd = ref(true)
const users_store = useUsersStore()
const { is_admin } = storeToRefs(users_store)

async function onSubmit() {
  await users_store.login(email.value, password.value)
}

function signOut() {
  LocalStorage.remove('token')
  window.location.reload()
}
</script>

<style></style>
