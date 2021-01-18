import React, { Component } from 'react'
import {Container} from 'reactstrap'
import NewCases from './NewCases'
import Selector from './Selector'

export default class Body extends Component {
    
    render() {

        

        return (
            <div>
                <Container >
                    <Selector location={this.props.location} changeLocation={this.props.changeLocation}/>
                    
                    <NewCases location={this.props.location} />
                </Container>
            </div>
        )
    }
}
