import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'


class Oauthcallback extends Component {
  constructor() {
    super()
  }  

  render () {
    // console.log('this.props', this.props)
    // console.log('this.props.location.search', this.props.location.search)
    // remove '?' at the beginning
    const search = this.props.location.search.substr(1)
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
    // console.log('hash', hashSearchParams)
    // console.log('Window', window)
    window.opener && window.opener.postMessage(hashSearchParams, '*')
    
    return (
      <div className="container m-5 p-2">
        Authorization Granted
      </div>
    )
  }
}

export default withRouter(Oauthcallback)
