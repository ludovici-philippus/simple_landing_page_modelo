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
  create_product: 'create_product'
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

    async addProduct(data) {
      return await axios({
        method: 'post',
        url: `${API_PATH()}product/${ENDPOINTS.create_product}`,
        data: data,
        headers: {
          'Authorization': LocalStorage.getItem('user_token') || 0,
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
          if(!response.data.success) throw "Não foi possível criar este produto!"

          positiveNotification("Produto criado com sucesso!")
          return true
        })
        .catch(e => {
          if (e.response) negativeNotification(e.response.data.error)
          throw e;
        });
      },

    },
  }
);
