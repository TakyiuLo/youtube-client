import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { css } from 'react-emotion'
import { DotLoader } from 'react-spinners'
import qs from 'qs'
import axios from 'axios'
import apiUrl from '../apiConfig'

class Oauthcallback extends Component {
  constructor() {
    super()
    
    this.state = {
      authenticated: false,
      onload: true,
      windowOpener: window.opener,
    }
  }  

  componentDidMount () {
    const { flash, location } = this.props
    const { windowOpener } = this.state
    // console.log('this.props', this.props)
    // console.log('this.props.location.search', this.props.location.search)
    if (!location.search) {
      return
    }
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
    // console.log('Code is', hashSearchParams.code)
    // console.log('Window opener is', windowOpener)

    this.getToken(hashSearchParams.code)
      .then((res) => {
        try {
          // console.log('Token', res.data.token)
          windowOpener.postMessage(res.data, '*')
          this.setState({ authenticated: true })
        } catch (e) {
          flash('Please try again', 'flash-error')
          console.error(e)
        } finally {
          // remove onload after Granted/Not Access
          this.setState({ onload: false })
        }
      })
      .catch((err) => this.setState({ onload: false }))
  }
  
  getToken = (code) => {
    return axios.request({
      method: 'POST',
      url: apiUrl + '/grantaccess',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({ code })
    })
  }

  render () {
    const { authenticated, onload } = this.state
    const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    `

    return (
      <div className="container m-5 p-2">
        {!onload ?
          authenticated ?
            'Authorization Granted'
            :'Authorization Denied'
          :<div><DotLoader 
            className={override}
            sizeUnit={'px'}
            size={40}
            color={'#007faf'}
            loading={onload}
          />Loading ... </div>}
      </div>
    )
  }
}

export default withRouter(Oauthcallback)
