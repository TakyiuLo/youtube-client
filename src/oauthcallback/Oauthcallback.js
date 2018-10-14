import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'


class Oauthcallback extends Component {
  constructor() {
    super()
    
    this.state = {
      authenticated: false
    }
  }  

  componentDidMount () {
    const { flash, location } = this.props
    // console.log('this.props', this.props)
    // console.log('this.props.location.search', this.props.location.search)
    // remove '?' at the beginning
    const search = location.search.substr(1)
    // split by '&'
    const searchParamsArr = search.split('&')
    const hashSearchParams = {}
    searchParamsArr.map((param) => {
      // split by '='
      const keyValueArr = param.split('=')
      //  hash it
      hashSearchParams[keyValueArr[0]] = keyValueArr[1]
      // leave it unmodify
      return param
    })
    // check if there is a parent window
    window.opener ?
      () => {
        window.opener && window.opener.postMessage(hashSearchParams, '*')
        this.setState({ authenticated: true })
      }
      :() => flash('No parent window found, Please try again', 'flash-error')
  }

  render () {
    const { authenticated } = this.state
  
    return (
      <div className="container m-5 p-2">
        {authenticated ?
          'Authorization Granted'
          :'Authorization Denied'}
      </div>
    )
  }
}

export default withRouter(Oauthcallback)
