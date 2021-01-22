import React, { Component } from 'react'
import {Container} from 'reactstrap'
import NewCases from './NewCases'
import NewDeaths from './NewDeaths'
import Selector from './Selector'
import Footer from './Footer'

export default class Body extends Component {
    
    render() {

        

        return (
          <div>
            <Container>
              <Selector
                location={this.props.location}
                changeLocation={this.props.changeLocation}
              />
              <hr />
              <NewCases location={this.props.location} />
              <hr />
                <NewDeaths location ={this.props.location} />
            </Container>
            <Footer />
          </div>
        );
    }
}
