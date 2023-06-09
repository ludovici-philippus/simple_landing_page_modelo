import axios from 'axios';
import { API_PATH } from '../shared/helpers.js'
import { defineStore } from 'pinia';
import { LocalStorage, SessionStorage } from 'quasar'
import { positiveNotification, negativeNotification } from '../shared/helpers.js'

const api = axios.create({
  baseURL: API_PATH()+"faq/",
  headers: {'Authorization': LocalStorage.getItem('user_token') || 0},
  withCredentials: false,
});

const ENDPOINTS = {
  get_faqs: 'all',
  add_faq: 'add_faq',
  edit_faq: 'edit',
  delete_faq: 'delete',
}

export const useFaqStore = defineStore('faq', {
  state: () => ({
  }),
  actions: {

    async getFaqs() {
      return await api.get(`${ENDPOINTS.get_faqs}`)
        .then(response => {
            return response.data.result
          }
        )
        .catch(e => {
          throw e;
      });
    },

    async addNewFaq(question, answer) {
      return await api.post(`${ENDPOINTS.add_faq}`, {
        question: question,
        answer: answer
      })
        .then(response => {
            positiveNotification('Pergunta frequente adicionada com sucesso')
            return response.data.result
          }
        )
        .catch(e => {
          throw e;
      });
    },

    async editFaq(id, question, answer) {
      return await api.patch(`${ENDPOINTS.edit_faq}/${id}`, {
        question: question,
        answer: answer
      })
        .then(response => {
            positiveNotification('Pergunta frequente editada com sucesso')
            return response.data.result
          }
        )
        .catch(e => {
          throw e;
      });
    },

    async deleteFaq(id) {
      return await api.delete(`${ENDPOINTS.delete_faq}/${id}`)
        .then(response => {
            positiveNotification('Pergunta frequente deletada com sucesso')
            return response.data.result
          }
        )
        .catch(e => {
          throw e;
      });
    },

    },
  }
);
