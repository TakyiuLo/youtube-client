import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import './Profile.scss'
import apiUrl from '../apiConfig'
import ChannelID from './ChannelID'
import { Index, Post, Delete, Update } from './api'
import {
  Animation,
  Button,
  Card,
  CardBody,
  CardTitle,
  Fa,
  ListGroup,
  ListGroupItem
} from 'mdbreact'

class Profile extends Component {
  constructor() {
    super()
    
    this.state = {
      profiles: [],
      animation: false
    }
  }
  
  componentDidMount () {
    this.getProfiles()
  }
  
  getProfiles = async () => {
    const { user, flash } = this.props
    await Index(user)
      .then((res) => {
        this.setState({ 
          profiles: res.data.profiles,
          animation: true 
        })
        // console.log('Profiles', res.data.profiles)
      })
      .catch(err => flash('Fail To get profiles', 'flash-error'))
  }
  
  newId = async () => {
    const { profiles } = this.state
    const { user, flash } = this.props
    await Post(user)
      .then(res => { this.setState({ profiles: [...profiles, res.data.profile] })})
      .catch(() => flash('Fail To Create', 'flash-error'))
  }
  
  remove = async (profileId) => {
    const { profiles } = this.state
    const { user, flash } = this.props
    await Delete(user, profileId)
      .then(() => this.setState({profiles: profiles.filter(profile => profile._id !== profileId)}))
      .catch(() => flash('Fail To Delete', 'flash-error'))
  }
  
  channelIds = () => {
    let count = 0
    
    const items = this.state.profiles.map(profile => {
      // console.log(this.state.animation)
      count++
      return (
        <Animation
          type='fadeInUp'
          key={profile._id}
          delay={this.state.animation && count*0.1 + 's' }
          duration='0.3s'>
          <ListGroupItem className="channelId" >
            <ChannelID
              user={this.props.user}
              profile={profile}
              flash={this.props.flash}
              channelId={profile.channelId}
              remove={this.remove}
              save={Update} />
          </ListGroupItem>
        </Animation>
      )
    })
    return items
  }

  render () {
    const { channelIds } = this.state
    const { user, flash } = this.props
    return (
      <Card className="Profile container m-5 p-1">
        <CardBody>
          <CardTitle>Profile</CardTitle>
          {this.state.profiles && <ListGroup>{this.channelIds()}</ListGroup>}
          <Button className="cl" onClick={this.newId}>Add Channel Id</Button>
        </CardBody>
      </Card>
    )
  }
}

export default withRouter(Profile)
