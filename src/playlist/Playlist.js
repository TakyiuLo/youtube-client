import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import apiUrl from '../apiConfig'
import axios from 'axios'
import './Playlist.scss'
import { Index, Post, Delete, Update } from '../profile/api'
import { getUrl, getToken, getPlaylist } from './api'

class Playlist extends Component {
  constructor() {
    super()
    
    this.state = {
      channelIds: [],
    }
  }
  
  componentDidMount() {
    console.log('Playlist mount success')
    const { flash, user } = this.props
    
    // get permission url
    getUrl(user)
      .then((res) => {
        flash('resquest to /permissionUrl success', 'flash-success')
        // console.log('permissionUrl: ', res.data.url)
        return res.data.url
      })
      .then(url => {
        // params: received permission url
        // then: open a new window for user consent using this url from Google
        const windowThatWasOpened = window.open(url, 'Please sign in with Google', 'width=500px,height:700px')
        // listen for the code, the code will be use for getting a token
        const codeListener = (res) => {
        	console.log('message', res.data)
          windowThatWasOpened.close()
          window.removeEventListener('message', codeListener)
          const code = res.data.code
          
          // get token
          getToken(user, code)
            .then((res) => {
              // token: here
              console.log('Token', res.data.data.access_token)
              // get playlist
              return getPlaylist(user, res.data.data.access_token)
            })
            .then(console.log)
            .catch(console.error)
        }
        window.addEventListener('message', codeListener)
      })
      .catch(() => flash('Permission Denied', 'flash-err'))
  }
  
  render () {
    const { flash, user } = this.props
    return (
      <div className="Playlist container m-5 p-1">
        Playlist
      </div>
    )
  }
}

export default withRouter(Playlist)
