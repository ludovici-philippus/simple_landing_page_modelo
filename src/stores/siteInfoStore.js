import axios from 'axios';
import { API_PATH } from '../shared/helpers.js'
import { defineStore } from 'pinia';
import { LocalStorage, SessionStorage } from 'quasar'
import { positiveNotification, negativeNotification } from '../shared/helpers.js'

const api = axios.create({
  baseURL: API_PATH()+"site_info/",
  headers: {'Authorization': LocalStorage.getItem('user_token') || 0},
  withCredentials: false,
});

const ENDPOINTS = {
  get_site_info: '',
  edit_video: 'edit_video',
  delete_video: '/video',
}

export const useSiteInfoStore = defineStore('siteInfo', {
  state: () => ({
    about_me: ''
  }),
  actions: {

    async getSiteInfo() {
      return await api.get(`${ENDPOINTS.get_site_info}/`)
        .then(response => {
          if(!response.data.success) throw "Não foi possível recuperar os dados dessa página"
          this.about_me = response.data.result[0].about_me
          return response.data.result[0]
          }
        )
        .catch(e => {
          negativeNotification(e)
          throw e;
      });
    },

    async editVideo(video_url, text) {
      return await api.patch(`${ENDPOINTS.edit_video}/`, {
        video_url: video_url,
      })
        .then(response => {
          if(!response.data.success) throw `Não foi possível ${text} o vídeo`
          positiveNotification(`Vídeo ${text} com sucesso`)
          return response.data.success
          }
        )
        .catch(e => {
          if (e.response) negativeNotification(e.response.data.error)
          throw e;
      });
    },

    async deleteVideo() {
      return await api.delete(`${ENDPOINTS.delete_video}/`)
        .then(response => {
          if(!response.data.success) throw `Não foi possível deletar o vídeo`
          positiveNotification(`Vídeo deletado com sucesso`)
          return response.data.success
          }
        )
        .catch(e => {
          if (e.response) negativeNotification(e.response.data.error)
          throw e;
      });
    },

    },
  }
);
