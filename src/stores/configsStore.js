import axios from 'axios';
import { API_PATH } from '../shared/helpers.js'
import { defineStore } from 'pinia';
import { LocalStorage, SessionStorage } from 'quasar'
import { positiveNotification, negativeNotification } from '../shared/helpers.js'

const api = axios.create({
  baseURL: API_PATH()+"config/",
  headers: {'Authorization': LocalStorage.getItem('user_token') || 0},
  withCredentials: false,
});

const ENDPOINTS = {
  get_about_me_label: 'about_me',
  get_product_label: 'product',

  edit_about_me_label: 'about_me',
  edit_product_label: 'product',
}

export const useConfigsStore = defineStore('configs', {
  state: () => ({
    about_me_label: 'Sobre mim',
    product_label: 'Produtos',
  }),
  actions: {

    async getAboutMeLabel() {
      return await api.get(`${ENDPOINTS.get_about_me_label}`)
        .then(response => {
            this.about_me_label = response.data.result
            return response.data.result
          }
        )
        .catch(e => {
          throw e;
      });
    },

    async getProductLabel() {
      return await api.get(`${ENDPOINTS.get_product_label}`)
        .then(response => {
            this.product_label = response.data.result
            return response.data.result
          }
        )
        .catch(e => {
          throw e;
      });
    },

    async editAboutMeLabel(about_me) {
      return await api.patch(`${ENDPOINTS.edit_about_me_label}`, { about_me: about_me })
        .then(response => {
            positiveNotification('Subtítulo atualizado com sucesso!')
            return response.data.result
          }
        )
        .catch(e => {
          negativeNotification('Erro ao atualizar subtítulo')
          throw e;
      });
    },

    async editProductLabel(product) {
      return await api.patch(`${ENDPOINTS.edit_product_label}`, { product: product })
        .then(response => {
            positiveNotification('Subtítulo atualizado com sucesso!')
            return response.data.result
          }
        )
        .catch(e => {
          negativeNotification('Erro ao atualizar subtítulo')
          throw e;
      });
    },

    },
  }
);
