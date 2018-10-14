import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { handleErrors, changePassword } from '../api'
import messages from '../messages'
import apiUrl from '../../apiConfig'

import './AuthForms.scss'
import { css } from 'react-emotion'
import { DotLoader } from 'react-spinners'
import {
  Container,
  Row,
  Col,
  Input,
  Button,
  Fa,
  Card,
  CardBody,
  ModalFooter,
  Animation
} from 'mdbreact'

class ChangePassword extends Component {
  constructor () {
    super()

    this.state = {
      oldPassword: '',
      newPassword: '',
      onload: false,
    }
    this.state.Default = Object.assign({}, this.state)
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })
  
  clearInputs = () => this.setState(this.state.Default())

  changePassword = event => {
    event.preventDefault()

    const { oldPassword, newPassword } = this.state
    const { flash, history, user } = this.props

    this.setState({ onload: true })

    changePassword(this.state, user)
      .then(handleErrors)
      .then(() => this.setState({ onload: false }))
      .then(() => flash(messages.changePasswordSuccess, 'flash-success'))
      .then(() => history.push('/'))
      .catch(() => {
        flash(messages.changePasswordFailure, 'flash-error')
        this.setState({ onload: false })
      })
  }

  render () {
    const { oldPassword, newPassword, onload } = this.state
    const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    `
    
    return (
      <Row className="auth-form">
        <Col md="12">
          <Card>
            <CardBody>
              <div className="blue-grey-text text-center">
                <h3 className="mb-5">
                  <strong>Change Password</strong>
                </h3>
              </div>
              <Input
                name="oldPassword"
                onChange={this.handleChange}
                label="Type Your Old Password"
                value={oldPassword}
                type="password"
                size="sm"/>
              <Input
                name="newPassword"
                onChange={this.handleChange}
                value={newPassword}
                label="Type Your New Password"
                type="password"
                size="sm"/>
              <Row className="d-flex align-items-center mb-4">
                <Col md="12" className="text-center">
                  {!onload ?
                    <Button 
                      type="submit"
                      onClick={this.changePassword}
                      className="btn btn-primary btn-block btn-rounded z-depth-1">
                      Login
                    </Button>
                    :<DotLoader 
                      className={override}
                      sizeUnit={'px'}
                      size={40}
                      color={'#007faf'}
                      loading={onload}
                    />}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  }
}

export default withRouter(ChangePassword)
