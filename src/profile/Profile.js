import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import './Profile.scss'
import apiUrl from '../apiConfig'
import ChannelID from './ChannelID'
import { Index, Post, Delete, Update } from './api'
import {
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
      profiles: []
    }
  }
  
  componentDidMount () {
    this.getProfiles()
  }
  
  getProfiles = async () => {
    const { user, flash } = this.props
    await Index(user)
      .then((res) => this.setState({ profiles: res.data.profiles }))
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
  
  channelIds = () => this.state.profiles.map(profile => 
    <ListGroupItem className="channelId" key={profile._id}>
      <ChannelID
        user={this.props.user}
        profile={profile}
        flash={this.props.flash}
        channelId={profile.channelId}
        remove={this.remove}
        save={Update} />
    </ListGroupItem>
  )

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
