import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../apiConfig'
import './video.scss'
import { css } from 'react-emotion'
import { DotLoader } from 'react-spinners'
import { $primaryColor } from '../theme/theme'
import {
  Button,
  Fa,
  Animation,
  ListGroup,
  ListGroupItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  View,
  Mask
} from 'mdbreact'
import ReactPlayer from 'react-player'

class VideoItem extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      video: props.info ,
      onload: true,
      isHover: false,
      loadVideo: false
    }
  }
  
  onload = (event) => {
    this.setState({ onload: false })
  }
  
  addTo = (playlistId, videoId) => {    
    const { user, flash } = this.props
    
    const config = {
      method: 'POST',
      url: apiUrl + '/addToPlaylist',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Token token=${user.token}`
      },
      data: JSON.stringify({
        token: user.youtubeToken.access_token,
        playlistId,
        videoId
      })
    }
    
    axios.request(config)
      .then((res) => { flash('Saved', 'flash-success') })
      .catch((err) => { flash('Fail to add to Playlist', 'flash-error') })
    
  }
  
  playlist = (videoId) => {
    const { user } = this.props
    const playlistsTitles = user.playlists.map((playlist) => (
      <div 
        key={playlist.id}
        onClick={() => this.addTo(playlist.id, videoId)}>
        {playlist.title}
      </div>
    ))
    return playlistsTitles  
  }
  
  onHover = () => this.setState({ isHover: true })
  onHoverLeave = () => this.setState({ isHover: false })
  
  loadVideo = () => this.setState({ loadVideo: true })
  
  render () {
    const { video, onload, isHover, loadVideo } = this.state
    const { user, history, toSignIn } = this.props
    const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    `
    const opts = {
      width: 250,
      height: 200,
    }
    
    return (
      <div className="videoItem">
        <div className="video">          
          {onload &&
            <DotLoader
              className={override}
              sizeUnit={'px'}
              size={40}
              color={$primaryColor}
              loading={onload}
            />}
          {!loadVideo ?      
            <View zoom hoverable onClick={this.loadVideo}>
              <img
                src={`https://img.youtube.com/vi/${video.id.videoId}/0.jpg`}
                alt={video.snippet.title}
                onLoad={this.onload}
                 
                className="img-fluid" />
              <Mask className="flex-center">
                <p className="white-text"></p>
              </Mask>
            </View>
            :<iframe
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              width="250" height="200"
              frameBorder='0'
              allowFullScreen
              onLoad={this.onload}
              className={onload ? 'd-none' : ''}
            ></iframe>}
        </div>
        <div className="videoInfo">
          <h5>{video.snippet.title}</h5>
          <p>{video.snippet.description}</p>
        </div>
        {/* playlist titles */}
        <div className="dropdown-container">          
          <div className="parent-container">
            <div
              className="child-container"
              onMouseEnter={this.onHover}
              onMouseLeave={this.onHoverLeave}>
              {/* add to playlist */}
              {user ?
                user.youtubeToken ?
                  isHover ? 
                    this.playlist(video.id.videoId)
                    :<div>Add To ...</div>
                  :<div>Please choose your youtube account</div>
                :<div onClick={toSignIn}>Add To ...</div>}
            </div>    
          </div>
        </div>
      </div>
    )
  }
}

export default VideoItem
