import axios from 'axios'
import apiUrl from '../apiConfig'

export const Index = (user) => {
  return axios.request({
    method: 'GET',
    url: apiUrl + '/profiles',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    }
  })
}

export const Post = (user) => {
  return axios.request({
    method: 'POST',
    url: apiUrl + '/profiles',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    },
    data: JSON.stringify({
      profile: {
        channelId: '<Replace me with your channel id>'
      }
    })
  })
}

export const Delete = (user, profileId) => {
  return axios.request({
    method: 'DELETE',
    url: apiUrl + '/profiles/' + profileId,
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    }
  })
}

export const Update = (user, profileId, channelId) => {
  return axios.request({
    method: 'PATCH',
    url: apiUrl + '/profiles/' + profileId,
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    },
    data: JSON.stringify({
      profile: {
        channelId: channelId
      }
    })
  })
}
