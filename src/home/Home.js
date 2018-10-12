import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Search from './search/search'
import axios from 'axios'

import './Home.scss'

import { Button } from 'mdbreact'

class Home extends Component {
  constructor() {
    super()
    
    this.state = {
      searchText: ''
    }
  }  

  render () {
    return (
      <div className="Homepage container m-5 p-5">
        <h1>Home</h1>
        {/* <Search /> */}
        {/* <SearchResult /> */}
        <p className="m-4 text-size-4"> Welcome !!! To YoutubeX</p>
      </div>
    )
  }
}

export default withRouter(Home)
