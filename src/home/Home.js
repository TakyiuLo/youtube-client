import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import Search from './search'
import axios from 'axios'
import './Home.scss'
import './search.scss'
import VideoItem from './video'
import { css } from 'react-emotion'
import { DotLoader } from 'react-spinners'
import { Button, Fa, Animation, ListGroup, ListGroupItem } from 'mdbreact'

class Home extends Component {
  constructor() {
    super()
    
    this.state = {
      searchText: '',
      searchResults: {},
      videos: [],
      onload: false,
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
  
  setSearchResult = (result) => {
    // console.log('searchResult', result)
    this.setState({ 
      searchResult: result,
      videos: result.items,
      onload: false, })
  }
  
  videos = () => {
    const { searchResult, videos } = this.state
    // console.log('search results', this.state.searchResult)
    return videos.map((item) => (
      <ListGroupItem 
        className="videoItem"
        key={item.id.videoId}>
        <VideoItem info={item} />
      </ListGroupItem>
    ))
  }

  onload = () => {
    this.setState({ onload: true })
  }

  render () {
    const { onload } = this.state
    const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    `
    
    return (
      <Animation type='fadeIn'>      
        <div className="Homepage container m-5 p-5">
          <h1>Home</h1>
          <Search onload={this.onload} setResults={this.setSearchResult}/>
        </div>
        {onload ?
          <DotLoader 
            className={override}
            sizeUnit={'px'}
            size={40}
            color={'#007faf'}
            loading={onload}
          />
          :<ListGroup className="Videos">
            {this.state.videos.searchResults && 'Results'}
            {this.state.videos.length !== 0 && this.videos()}
          </ListGroup>
        }
      </Animation>
    )
  }
}

export default withRouter(Home)
