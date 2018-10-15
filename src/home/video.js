import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import axios from 'axios'

import './video.scss'

import { Button, Fa, Animation, ListGroup, ListGroupItem } from 'mdbreact'

class VideoItem extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      video: props.info 
    }
  }

  render () {
    const { video } = this.state
    return (
      <div className="videoItem mb-2">
        <iframe
          src={`https://www.youtube.com/embed/${video.id.videoId}??autoplay=1`}
          width="250" height="200"
          frameBorder='0'
          allowFullScreen
        ></iframe>
        <div className="videoInfo">
          <h5>{video.snippet.title}</h5>
          <p>{video.snippet.description}</p>
        </div>
      </div>
    )
  }
}

export default VideoItem
