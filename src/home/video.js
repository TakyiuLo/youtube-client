import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import axios from 'axios'

import './video.scss'
import { css } from 'react-emotion'
import { DotLoader } from 'react-spinners'
import { $primaryColor } from '../theme/theme'
import {
  Button,
  Fa,
  Animation,
  ListGroup,
  ListGroupItem
} from 'mdbreact'
import ReactPlayer from 'react-player'

class VideoItem extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      video: props.info ,
      onload: true
    }
  }
  
  onload = (event) => {
    this.setState({ onload: false })
  }

  render () {
    const { video, onload } = this.state
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
          {video.id.videoId && <ReactPlayer
            className={onload ? 'd-none' : 'react-player'}
            url={`https://youtube.com/embed/${video.id.videoId}`}
            width='100%'
            height='100%'
            onReady={this.onload}
          />}
          {/* <iframe
            src={`https://www.youtube.com/embed/${video.id.videoId}?autoplay=1`}
            width="250" height="200"
            frameBorder='0'
            allowFullScreen
            onReady={this.onload}
            className={onload ? 'd-none' : ''}
          ></iframe> */}
        </div>
        <div className="videoInfo">
          <h5>{video.snippet.title}</h5>
          <p>{video.snippet.description}</p>
        </div>
      </div>
    )
  }
}

export default VideoItem
