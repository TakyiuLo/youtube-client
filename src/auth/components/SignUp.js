import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

import {handleErrors, signUp, signIn} from '../api'
import messages from '../messages'
import apiUrl from '../../apiConfig'

import './AuthForms.scss'
import { css } from 'react-emotion'
import { DotLoader } from 'react-spinners'
import { $primaryColor } from '../../theme/theme'
import {
  Animation,
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
      onload: false,
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
    
    this.setState({ onload: true })
    
    signUp(this.state)
      .then(handleErrors)
      .then(() => signIn(this.state))
      .then(handleErrors)
      .then(res => res.json())
      .then(res => setUser(res.user))
      .then(() => this.setState({ onload: false }))
      .then(() => flash(messages.signUpSuccess, 'flash-success'))
      .then(() => history.push('/'))
      .catch(() => {
        flash(messages.signUpFailure, 'flash-error')
        this.setState({ onload: false })
      })
  }

  render() {
    const {email, password, passwordConfirmation, onload} = this.state
    const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    `

    return (
      <Animation 
        type="fadeInUp"
        duration='0.3s'>
        <Row className="auth-form">
          <Col md="12">
            <Card>
              <CardBody>
                <form onSubmit={this.signUp}>
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
                      {!onload ?
                        <Button 
                          type="submit"
                          onClick={this.signUp}
                          className="btn btn-primary btn-block btn-rounded z-depth-1">
                            Login
                        </Button>
                        :<DotLoader 
                          className={override}
                          sizeUnit={'px'}
                          size={40}
                          color={$primaryColor}
                          loading={onload}
                        />}
                    </Col>
                  </Row>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Animation>
    )
  }
}

export default withRouter(SignUp)
