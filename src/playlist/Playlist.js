import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import apiUrl from '../apiConfig'
import axios from 'axios'
import './Playlist.scss'
import { Index, Post, Delete, Update } from '../profile/api'
import { getUrl, getToken, getPlaylist } from './api'
import {
  Card,
  CardBody,
  CardTitle,
  Fa,
  ListGroup,
  ListGroupItem
} from 'mdbreact'

class Playlist extends Component {
  constructor() {
    super()
    
    this.state = {
      channelIds: [],
      playlists: []
    }
  }
  
  async componentDidMount () {
    const { flash, user, setUser } = this.props
    
    const res = await getUrl(user)
    const windowThatWasOpened = window.open(res.data.url, 'Please sign in with Google', 'width=500,height=700')
    // listen for token
    const tokenListener = (res) => {
      windowThatWasOpened.close()
      window.removeEventListener('message', tokenListener)
      const token = res.data.token
      // get playlist using token
      token && getPlaylist(user, token.access_token)
        .then((response) => { 
          const playlists = response.data.playlist.filteredPlaylists
          // set playlists
          this.setState({ playlists })
          // set User's youtube token
          setUser({ ...user, youtubeToken: token, playlists})
        })
        .catch((err) => flash('Permission Denied: Please try again', 'flash-err'))
    }
    window.addEventListener('message', tokenListener)
  }
  
  playlist = () => (
    this.state.playlists.map(playlist => 
      <ListGroupItem 
        className="playlistItem"
        key={playlist.id}>
        <h5>{playlist.title}</h5>
        <div className="embed-responsive embed-responsive-4by3 video mb-2">          
          <iframe 
            className="embed-responsive-item"
            src={`https://www.youtube.com/embed?listType=playlist&list=${playlist.id}&index=1`}
            frameBorder='0'
            allow="autoplay"
            allowFullScreen
          ></iframe>
        </div>
      </ListGroupItem>
    )
  )
  
  render () {
    const { flash, user } = this.props
    return (
      <ListGroup className="Playlist m-5 p-1">
        {this.state.playlists.length === 0 ? 'Playlist' : this.playlist()}
      </ListGroup>
    )
  }
}

export default withRouter(Playlist)
