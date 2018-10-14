import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import Search from './search/search'
import axios from 'axios'

import './Home.scss'


import { Button, Fa, Animation } from 'mdbreact'

class Home extends Component {
  constructor() {
    super()
    
    this.state = {
      searchText: ''
    }
  }
  
  oauthcallback = () => {
    // special path for home `/?redirect=oauthcallback&code=`
    // console.log('You are at', window.location.href)
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
    
    // remove redirect param
    if (hashSearchParams.redirect === 'oauthcallback') {
      // console.log('trying to redirect to oauthcallback')
      const redirectPath = hashSearchParams.redirect
      
      delete hashSearchParams['redirect']
      
      const arrRmRedirect = []
      Object.keys(hashSearchParams).forEach((key) => {
        const tmpArr = [ key, hashSearchParams[key]]
        const tmpStr = tmpArr.join('=')
        arrRmRedirect.push(tmpStr)
      })
      const strParams = arrRmRedirect.join('&')
      
      // console.log('hash to array', strParams)
      // console.log(`/${redirectPath}?${strParams}`)
      this.props.history.push(`/${redirectPath}?${strParams}`)
    }
  }
  
  componentDidMount () {
    this.oauthcallback()
  }

  render () {
    return (
      <Animation type='fadeIn'>      
        <div className="Homepage container m-5 p-5">
          <h1>Home</h1>
          <Search />
          {/* <SearchResult /> */}
        </div>
      </Animation>
    )
  }
}

export default withRouter(Home)
