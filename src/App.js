import React, { Component } from 'react'
import Header from './components/Header'
import Body from './components/Body'
import './App.css'


export default class App extends Component {

  state={
    location: 'United States'
    // location: 'Cincinnati MSA'
  }

  changeLocation = (e) => {
    this.setState({location: e.target.innerText})
  }

  render() {
    
    return (
      <div>
        <Header />
        <Body location={this.state.location} changeLocation ={this.changeLocation} />
      </div>
    )
  }
}
