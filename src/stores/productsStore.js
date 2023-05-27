import axios from 'axios';
import { API_PATH } from '../shared/helpers.js'
import { defineStore } from 'pinia';
import { LocalStorage, SessionStorage } from 'quasar'
import { positiveNotification, negativeNotification } from '../shared/helpers.js'

const api = axios.create({
  baseURL: API_PATH()+"product/",
  headers: {'Authorization': LocalStorage.getItem('user_token') || 0},
  withCredentials: false,
});

const ENDPOINTS = {
  get_products: 'all',
}

export const useProductsStore = defineStore('products', {
  state: () => ({
  }),
  actions: {

    async getProducts() {
      return await api.get(`${ENDPOINTS.get_products}/`)
        .then(response => {
          if(!response.data.success) throw "Não foi possível recuperar os produtos"
          return response.data.result
          }
        )
        .catch(e => {
          negativeNotification(e)
          throw e;
      });
    },

    },
  }
);
