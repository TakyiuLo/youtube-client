import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

import {handleErrors, signUp, signIn} from '../api'
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
  ModalFooter
} from 'mdbreact'

class SignUp extends Component {
  constructor() {
    super()

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
    }
    this.state.Default = Object.assign({}, this.state)
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  });

  clearInputs = () => this.setState(this.state.Default)
  
  signUp = event => {
    event.preventDefault()

    const {email, password, passwordConfirmation} = this.state
    const {flash, history, setUser} = this.props
    
    signUp(this.state)
      .then(handleErrors)
      .then(() => signIn(this.state))
      .then(handleErrors)
      .then(res => res.json())
      .then(res => setUser(res.user))
      .then(() => flash(messages.signUpSuccess, 'flash-success'))
      .then(() => history.push('/'))
      .catch(() => flash(messages.signUpFailure, 'flash-error'))
  }

  render() {
    const {email, password, passwordConfirmation} = this.state

    return (
      <Row className="auth-form">
        <Col md="12">
          <Card>
            <CardBody>
              <div className="blue-grey-text text-center">
                <h3 className="mb-5">
                  <strong>Sign up</strong>
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
                size="sm"/>
              <Input
                name="passwordConfirmation"
                onChange={this.handleChange}
                value={passwordConfirmation}
                label="Confirm Your password"
                type="password"
                size="sm"/>
              <Row className="d-flex align-items-center mb-4">
                <Col md="12" className="text-center">
                  <Button 
                    type="submit"
                    onClick={this.signUp}
                    className="btn btn-primary btn-block btn-rounded z-depth-1">
                    Register
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  }
}

export default withRouter(SignUp)
