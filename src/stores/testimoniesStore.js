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
}

export const useTestimoniesStore = defineStore('testimonies', {
  state: () => ({
  }),
  actions: {

    async getTestimonies() {
      return await api.get(`${ENDPOINTS.get_testimonies}/`)
        .then(response => {
            if(!response.data.success) throw "Não foi possível recuperar os depoimentos"
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
