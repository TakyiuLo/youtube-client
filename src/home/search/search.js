import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import {
  FormInline,
  Fa,
  Input
} from 'mdbreact'

class Search extends Component {
  constructor() {
    super()
    
    this.state = {
      searchText: ''
    }
  }
  
  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })
  search = event => {
    const { searchText } = this.state
    console.log('search text: ', searchText)
  }
  
  render () {
    const { searchText } = this.state
    return (
      <FormInline className="md-form active-cyan-2 ">
        <input
          name="searchText"
          value={searchText}
          onChange={this.handleChange}
          className="form-control form-control-sm mr-3 w-75"
          type="text"
          placeholder="Search"
          aria-label="Search"/>
        <Fa icon="search" />
      </FormInline>
    )
  }
}

export default withRouter(Search)
