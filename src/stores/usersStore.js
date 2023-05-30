import axios from 'axios';
import { API_PATH } from '../shared/helpers.js'
import { defineStore } from 'pinia';
import { LocalStorage, SessionStorage } from 'quasar'
import { positiveNotification, negativeNotification } from '../shared/helpers.js'

const api = axios.create({
  baseURL: API_PATH()+"user/",
  headers: {'Authorization': LocalStorage.getItem('user_token') || 0},
  withCredentials: false,
});

const ENDPOINTS = {
  get_me: 'me',
  login: 'login',
  edit_credentials: 'edit_credentials'
}

export const useUsersStore = defineStore('users', {
  state: () => ({
    user_id: -1,
    email: '',
    is_admin: false,
  }),
  actions: {

    async login(email, password) {
      return await api.post(`${ENDPOINTS.login}`, {
        email: email,
        password: password,
      })
        .then(response => {
            if(!response.data.success) throw response.data.error
            this.user_id = response.data.result.id
            LocalStorage.set('user_token', response.data.result.token)
            positiveNotification("Logado com sucesso!")
            setTimeout(() => {
              window.location.reload()
            }, 1000);
          }
        )
        .catch(e => {
          if (e.response) negativeNotification(e.response.data.error)
          throw e;
      });
    },

    async editCredentials(email, password) {
      return await api.patch(`${ENDPOINTS.edit_credentials}`, {
        email: email,
        password: password,
      })
        .then(response => {
            if(!response.data.success) throw response.data.error
            this.user_id = response.data.result.id
            LocalStorage.set('user_token', response.data.result.token)
            positiveNotification("Credenciais alteradas com sucesso!")
            setTimeout(() => {
              window.location.reload()
            }, 1000);
          }
        )
        .catch(e => {
          if (e.response) negativeNotification(e.response.data.error)
          else negativeNotification("Não foi possível alterar as credenciais")
          throw e;
      });
    },

    async getMe() {
      return await api.get(`${ENDPOINTS.get_me}`)
        .then(response => {
            if(!response.data.success) throw response.data.error
            this.user_id = response.data.result.id
            this.email = response.data.result.email
            this.is_admin = response.data.result.is_admin
          }
        )
        .catch(e => {
          throw e;
      });
    },

    },
  }
);
