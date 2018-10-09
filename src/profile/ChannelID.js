import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../apiConfig'
import './ChannelID.scss'
import { Fa, Input } from 'mdbreact'

class ChannelID extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      channelId: props.channelId,
      editable: false,
    }
  }
  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })
  
  edit = () => this.setState({ editable: true })
  
  cancel = () => this.setState({ editable: false, channelId: this.props.channelId, })

  save = async () => {
    const { user, profile, flash, save } = this.props
    const { channelId } = this.state
    await save(user, profile._id, channelId )
      .then(() => this.setState({ editable: false }))
      .then(() => flash('Save', 'flash-success'))
      .catch(() => flash('Fail To Save', 'flash-error'))
  }

  render () {
    const { editable, channelId } = this.state
    /* remove must be from parent
     * can not remove itself
    */
    const { remove, profile } = this.props
    return (
      <div className="ChannelID-item">
        <Input
          onChange={this.handleChange}
          value={channelId}
          name="channelId"
          label="Channel ID" 
          disabled={!editable} />
        <div className="setup">
          {editable ?
            <Fa
              onClick={this.save}
              icon="check"
              className="ml-2 mr-2"
              size="sm" /> :
            <Fa
              onClick={this.edit}
              icon="edit"
              className="ml-2 mr-2"
              size="sm" />
          }|
          <Fa
            onClick={editable ? this.cancel : () => remove(profile._id)}
            icon="remove"
            className="ml-2 mr-2"
            size="sm" />
        </div>
      </div>
    )
  }
}

export default withRouter(ChannelID)
