import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signIn } from '../api'
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

class SignIn extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: '',
      mouseEnter: false,
      onload: false,
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

    const { email, password, onload } = this.state
    const { flash, history, setUser } = this.props
    
    this.setState({ onload: true })
    
    signIn(this.state)
      .then(res => res.ok ? res : new Error())
      .then(res => res.json())
      .then(res => setUser(res.user))
      .then(() => flash(messages.signInSuccess, 'flash-success'))
      .then(() => history.push('/'))
      .catch(() => flash(messages.signInFailure, 'flash-error'))
      .finally(() => this.setState({ onload: false }))
  }
  
  mouseEnter = () => {
    this.setState({ mouseEnter: !this.state.mouseEnter })
  }
  
  render () {
    const { email, password, mouseEnter, onload } = this.state
    const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    `
    return (
      <Row className="auth-form">
        <Col md="12">
          <Animation
            onMouseEnter={this.mouseEnter}
            onMouseLeave={this.mouseEnter}
            duration='0.3s'
            type='fadeInDown'>
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
                    {!onload ?
                      <Button 
                        type="submit"
                        onClick={this.signIn}
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
          </Animation>
        </Col>
      </Row>
    )
  }
}

export default withRouter(SignIn)
