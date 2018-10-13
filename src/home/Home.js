import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
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
