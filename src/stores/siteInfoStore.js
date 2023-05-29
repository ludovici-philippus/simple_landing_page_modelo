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
  edit_about_me: 'edit_about_me',
  delete_video: 'video',
}

export const useSiteInfoStore = defineStore('siteInfo', {
  state: () => ({
    about_me: ''
  }),
  actions: {

    async getSiteInfo() {
      return await api.get(`${ENDPOINTS.get_site_info}`)
        .then(response => {
          if(!response.data.success) throw "Não foi possível recuperar os dados dessa página"
          this.about_me = response.data.result[0].about_me
          return response.data.result[0]
          }
        )
        .catch(e => {
          negativeNotification("Não foi possível recuperar os dados dessa página")
          throw e;
      });
    },

    async editVideo(video_url, text) {
      return await api.patch(`${ENDPOINTS.edit_video}`, {
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
          else negativeNotification(`Não foi possível ${text} o vídeo`)
          throw e;
      });
    },

    async editAboutMe(about_me) {
      return await api.patch(`${ENDPOINTS.edit_about_me}`, {
        about_me: about_me,
      })
        .then(response => {
          if(!response.data.success) throw `Não foi possível editar o texto`
          positiveNotification(`Sobre mim editado com sucesso`)
          return response.data.success
          }
        )
        .catch(e => {
          if (e.response) negativeNotification(e.response.data.error)
          else negativeNotification(`Não foi possível editar o texto`)
          throw e;
      });
    },

    async deleteVideo() {
      return await api.delete(`${ENDPOINTS.delete_video}`)
        .then(response => {
          if(!response.data.success) throw `Não foi possível deletar o vídeo`
          positiveNotification(`Vídeo deletado com sucesso`)
          return response.data.success
          }
        )
        .catch(e => {
          if (e.response) negativeNotification(e.response.data.error)
          else negativeNotification(`Não foi possível deletar o vídeo`)
          throw e;
      });
    },

    },
  }
);
