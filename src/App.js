import React, { Component } from 'react'
import './App.scss'
import { Route, Link } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'

import Home from './home/Home'
import Profile from './profile/Profile'
import Playlist from './playlist/Playlist'
import Oauthcallback from './oauthcallback/Oauthcallback'
class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      flashMessage: '',
      flashType: null
    }
  }

  setUser = user => {
    // console.log('user', user)
    this.setState({ user })
  }

  clearUser = () => this.setState({ user: null })

  flash = (message, type) => {
    this.setState({ flashMessage: message, flashType: type })

    clearTimeout(this.messageTimeout)

    this.messageTimeout = setTimeout(() => this.setState({flashMessage: null
    }), 2000)
  }

  render () {
    const { flashMessage, flashType, user } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        {flashMessage && <h3 className={flashType}>{flashMessage}</h3>}
        
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp flash={this.flash} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn flash={this.flash} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut flash={this.flash} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword flash={this.flash} user={user} />
          )} />
          <Route user={user} exact path='/' render={() => (
            <Home />
          )} />
          <AuthenticatedRoute user={user} path='/profile' render={() => (
            <Profile flash={this.flash} user={user} />
          )} />
          <Route user={user} path='/oauthcallback' render={() => (
            <Oauthcallback flash={this.flash} user={user}/>
          )} />
          <Route user={user} path='/youtube-client/oauthcallback' render={() => (
            <Oauthcallback flash={this.flash} user={user}/>
          )} />
          <AuthenticatedRoute user={user} path='/playlist' render={() => (
            <Playlist flash={this.flash} user={user} />
          )} />
        </main>
      </React.Fragment>
    )
  }
}

export default App
