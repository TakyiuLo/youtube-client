import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../apiConfig'
import qs from 'qs'

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
    event.preventDefault()
    const { searchText } = this.state
    const { setResults } = this.props
    
    // console.log('searchText', searchText)
    this.searchRequest(searchText)
      .then((res) => {
        // console.log('results', res.data.result)
        setResults(res.data.result)
      })
      .catch((err) => {console.error('err', err)})
  }
  
  searchRequest = (searchText) => {
    return axios({
      method: 'GET',
      url: apiUrl + '/search',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      params: {
        q: searchText
      },
      paramsSerializer: function (params) {
        return qs.stringify(params, { encode: false })
      }
    })
  }
  
  render () {
    const { searchText } = this.state
    return (
      <FormInline className="md-form active-cyan-2" onSubmit={this.search}>
        <input
          name="searchText"
          value={searchText}
          onChange={this.handleChange}
          className="form-control form-control-sm mr-3 w-75"
          type="text"
          placeholder="Search"
          aria-label="Search"/>
        <Fa icon="search" onClick={this.search}/>
      </FormInline>
    )
  }
}

export default withRouter(Search)
