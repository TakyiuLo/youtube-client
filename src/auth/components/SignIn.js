import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signIn } from '../api'
import messages from '../messages'
import apiUrl from '../../apiConfig'

import './AuthForms.scss'
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

class SignIn extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: '',
      mouseEnter: false
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })
  
  clearInputs = () => {
    this.setState({
      email: '',
      password: '',
    })
  }

  signIn = event => {
    event.preventDefault()

    const { email, password } = this.state
    const { flash, history, setUser } = this.props

    signIn(this.state)
      .then(res => res.ok ? res : new Error())
      .then(res => res.json())
      .then(res => setUser(res.user))
      .then(() => flash(messages.signInSuccess, 'flash-success'))
      .then(() => history.push('/'))
      .catch(() => flash(messages.signInFailure, 'flash-error'))
  }
  
  mouseEnter = () => {
    this.setState({ mouseEnter: !this.state.mouseEnter })
  }
  
  render () {
    const { email, password, mouseEnter } = this.state
    
    return (
      <Row className="auth-form">
        <Col md="12">
          <Animation 
            onMouseEnter={this.mouseEnter}
            onMouseLeave={this.mouseEnter}
            type={mouseEnter ? '' : 'tadax'}
            infinite>
            <Card>
              <CardBody>
                <div className="blue-grey-text text-center">
                  <h3 className="mb-5">
                    <strong>Sign In</strong>
                  </h3>
                </div>
                <Input
                  name="email"
                  onChange={this.handleChange}
                  value={email}
                  label="Type Your email"
                  type="email"
                  size="sm"/>
                <Input
                  name="password"
                  onChange={this.handleChange}
                  value={password}
                  label="Type Your password"
                  type="password"
                  size="sm" />
                <Row className="d-flex align-items-center mb-4">
                  <Col md="12" className="text-center">
                    <Button 
                      type="submit"
                      onClick={this.signIn}
                      className="btn btn-primary btn-block btn-rounded z-depth-1">
                      Login
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Animation>
        </Col>
      </Row>
    )
  }
}

export default withRouter(SignIn)
