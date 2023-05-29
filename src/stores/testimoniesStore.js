import axios from 'axios';
import { API_PATH } from '../shared/helpers.js'
import { defineStore } from 'pinia';
import { LocalStorage, SessionStorage } from 'quasar'
import { positiveNotification, negativeNotification } from '../shared/helpers.js'

const api = axios.create({
  baseURL: API_PATH()+"testimony/",
  headers: {'Authorization': LocalStorage.getItem('user_token') || 0},
  withCredentials: false,
});

const ENDPOINTS = {
  get_testimonies: 'all',
  add_testimony: 'create_testimony',
  edit_testimony: 'edit_testimony',
  delete_testimony: 'delete_testimony',
}

export const useTestimoniesStore = defineStore('testimonies', {
  state: () => ({
  }),
  actions: {

    async getTestimonies() {
      return await api.get(`${ENDPOINTS.get_testimonies}`)
        .then(response => {
            if(!response.data.success) throw "Não foi possível recuperar os depoimentos"
            return response.data.result
          }
        )
        .catch(e => {
          negativeNotification("Não foi possível recuperar os depoimentos")
          throw e;
      });
    },

    async addTestimony(testimony, author) {
      return await api.post(`${ENDPOINTS.add_testimony}`, {
        testimony: testimony,
        author: author
      })
        .then(response => {
            if(!response.data.success) throw "Não foi possível adicionar o depoimento"
            positiveNotification("Depoimento adicionado com sucesso!")
            return response.data.result
          }
        )
        .catch(e => {
          negativeNotification("Não foi possível adicionar o depoimento")
          throw e;
      });
    },

    async editTestimony(testimony_id, testimony, author) {
      return await api.patch(`${ENDPOINTS.edit_testimony}/${testimony_id}`, {
        testimony: testimony,
        author: author
      })
        .then(response => {
            if(!response.data.success) throw "Não foi possível editar o depoimento"
            positiveNotification("Depoimento editar com sucesso!")
            return response.data.result
          }
        )
        .catch(e => {
          negativeNotification("Não foi possível editar o depoimento")
          throw e;
      });
    },

    async deleteTestimony(testimony_id) {
      return await api.delete(`${ENDPOINTS.delete_testimony}/${testimony_id}`)
        .then(response => {
            if(!response.data.success) throw "Não foi possível deletar o depoimento"
            positiveNotification("Depoimento deletar com sucesso!")
            return response.data.result
          }
        )
        .catch(e => {
          negativeNotification("Não foi possível deletar o depoimento")
          throw e;
      });
    },

    },
  }
);
