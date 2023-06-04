import axios from 'axios';
import { API_PATH } from '../shared/helpers.js'
import { defineStore } from 'pinia';
import { LocalStorage, SessionStorage } from 'quasar'
import { positiveNotification, negativeNotification } from '../shared/helpers.js'

const api = axios.create({
  baseURL: API_PATH()+"social_midia/",
  headers: {'Authorization': LocalStorage.getItem('user_token') || 0},
  withCredentials: false,
});

const ENDPOINTS = {
  get_social_midias: 'all',
  edit_social_midias: 'edit_social_midias',
}

export const useSocialMidiasStore = defineStore('social_midias', {
  state: () => ({
  }),
  actions: {

    async getSocialMidias() {
      return await api.get(`${ENDPOINTS.get_social_midias}`)
        .then(response => {
            if(!response.data.success) throw "Não foi possível recuperar as redes sociais"
            return response.data.result[0]
          }
        )
        .catch(e => {
          negativeNotification("Não foi possível recuperar as redes sociais")
          throw e;
      });
    },

    async editSocialMidias(instagram, whatsapp, facebook, whatsapp_text) {
      return await api.patch(`${ENDPOINTS.edit_social_midias}`, {
        instagram: instagram,
        whatsapp: whatsapp,
        facebook: facebook,
        whatsapp_text: whatsapp_text,
      })
        .then(response => {
            if(!response.data.success) throw "Não foi possível editar os links das redes sociais"
            positiveNotification("Links editados com sucesso!")
            return response.data.result
          }
        )
        .catch(e => {
          negativeNotification("Não foi possível editar os links das redes sociais")
          throw e;
      });
    },
    },
  }
);
