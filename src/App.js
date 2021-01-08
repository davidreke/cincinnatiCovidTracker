import React, { Component } from 'react'
import Header from './components/Header'
import Body from './components/Body'
import './App.css'


export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Body />
      </div>
    )
  }
}
