import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { css } from 'react-emotion'
import { DotLoader } from 'react-spinners'

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
    
    windowOpener ?
      (() => {
        windowOpener.postMessage(hashSearchParams, '*')
        this.setState({ authenticated: true })
      })()
      :(() => {
        flash('No parent window found, Please try again', 'flash-error')
        // console.log('window opener', windowOpener)
      })()
    // remove onload after Granted/Not Access
    this.setState({ onload: false })
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
          :<DotLoader 
            className={override}
            sizeUnit={'px'}
            size={40}
            color={'#007faf'}
            loading={onload}
          />}
      </div>
    )
  }
}

export default withRouter(Oauthcallback)
