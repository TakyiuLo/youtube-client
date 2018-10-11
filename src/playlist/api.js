import axios from 'axios'
import apiUrl from '../apiConfig'

export const getUrl = (user) => {
  return axios.request({
    method: 'GET',
    url: apiUrl + '/permissionUrl',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    }
  })
}

export const getToken = (user, code) => {
  return axios.request({
    method: 'POST',
    url: apiUrl + '/grantaccess',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    },
    data: JSON.stringify({ code })
  })
}

export const getPlaylist = (user, token) => {
  return axios.request({
    method: 'POST',
    url: apiUrl + '/playlist',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    },
    data: JSON.stringify({ token })
  })
}
