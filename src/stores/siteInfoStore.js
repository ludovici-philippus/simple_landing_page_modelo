import axios from 'axios';
import { API_PATH } from '../shared/helpers.js'
import { defineStore } from 'pinia';
import { LocalStorage, SessionStorage } from 'quasar'
import { positiveNotification, negativeNotification } from '../shared/helpers.js'

const api = axios.create({
  baseURL: API_PATH()+"site_info",
  headers: {'Authorization': LocalStorage.getItem('user_token') || 0},
  withCredentials: false,
});

const ENDPOINTS = {
  get_site_info: '',
  edit_video: '/edit_video',
  edit_about_me: '/edit_about_me',
  edit_logo: '/edit_logo',
  edit_header_info: '/edit_header_info',
  delete_video: '/video',
  delete_about_me_image: '/about_me_image',
  delete_header_image: '/header_image',
}

export const useSiteInfoStore = defineStore('siteInfo', {
  state: () => ({
    about_me: '',
    image: '',
    logo: '',
  }),
  actions: {

    async getSiteInfo() {
      return await api.get(`${ENDPOINTS.get_site_info}`)
        .then(response => {
          if(!response.data.success) throw "Não foi possível recuperar os dados dessa página"
          this.about_me = response.data.result[0].about_me
          this.image = response.data.result[0].about_me_image
          this.logo = response.data.result[0].logo

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

    async editAboutMe(data) {
      return await axios({
        method: 'post',
        url: `${API_PATH()}site_info${ENDPOINTS.edit_about_me}`,
        data: data,
        headers: {
          'Authorization': LocalStorage.getItem('user_token') || 0,
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
          if(!response.data.success) throw `Não foi possível editar o texto`

          positiveNotification(`Sobre mim editado com sucesso`)
          return response.data.success
        })
        .catch(e => {
          if (e.response) negativeNotification(e.response.data.error)
          else negativeNotification(`Não foi possível editar o texto`)
          throw e;
        });

    },

    async editLogo(data) {
      return await axios({
        method: 'post',
        url: `${API_PATH()}site_info${ENDPOINTS.edit_logo}`,
        data: data,
        headers: {
          'Authorization': LocalStorage.getItem('user_token') || 0,
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
          if(!response.data.success) throw "Não foi possível editar a logomarca!"

          this.logo = response.data.result.logo
          positiveNotification("Logomarca editada com sucesso!")
          return true
        })
        .catch(e => {
          negativeNotification("Não foi possível editar a logomarca")
          throw e;
        });

    },

    async editHeaderInfo(data) {
      return await axios({
        method: 'post',
        url: `${API_PATH()}site_info${ENDPOINTS.edit_header_info}`,
        data: data,
        headers: {
          'Authorization': LocalStorage.getItem('user_token') || 0,
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
          if(!response.data.success) throw "Não foi possível editar as informações do cabeçalho!"

          this.logo = response.data.result.logo
          positiveNotification("Cabeçalho editado com sucesso!")
          return true
        })
        .catch(e => {
          negativeNotification("Não foi possível editar o cabeçalho")
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

    async deleteAboutMeImage() {
      return await api.delete(`${ENDPOINTS.delete_about_me_image}`)
        .then(response => {
          if(!response.data.success) throw `Não foi possível deletar a imagem lateral do sobre nós`
          positiveNotification(`Imagem lateral deletada com sucesso`)
          return response.data.success
          }
        )
        .catch(e => {
          if (e.response) negativeNotification(e.response.data.error)
          else negativeNotification(`Não foi possível deletar a imagem lateral`)
          throw e;
      });
    },

    async deleteHeaderImage() {
      return await api.delete(`${ENDPOINTS.delete_header_image}`)
        .then(response => {
          if(!response.data.success) throw `Não foi possível deletar a imagem do cabeçalho`
          positiveNotification(`Imagem do cabeçalho deletada com sucesso`)
          return response.data.success
          }
        )
        .catch(e => {
          if (e.response) negativeNotification(e.response.data.error)
          else negativeNotification(`Não foi possível deletar a imagem do cabeçalho`)
          throw e;
      });
    },

    },
  }
);
