import { Notify } from 'quasar'

export function negativeNotification(msg) {
  Notify.create({
    message: msg,
    color: 'negative',
    position: 'top-left'
  })
}

export function positiveNotification(msg) {
  Notify.create({
    type: 'positive',
    message: msg,
    position: 'top-left'
  })
}

export const API_PATH = () => {
  if (window.location.href.match('localhost')) return 'http://localhost:3000/api/v1/'
  if (window.location.href.match('dev')) return 'https://api-dev-landingpage.estudioempreendedor.com/api/v1/'
  return 'https://api.estudioempreendedor.com/api/v1/'
}

export const IMAGES_PATH = () => {
  if (window.location.href.match('localhost')) return 'http://localhost:3000/uploads/images'
  if (window.location.href.match('dev')) return 'https://api-dev-landingpage.estudioempreendedor.com/uploads/images'
  return 'https://api.estudioempreendedor.com/uploads/images'
}
