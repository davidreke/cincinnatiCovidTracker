import React, { Component } from 'react'
import {Container} from 'reactstrap'
import NewCases from './NewCases'

export default class Body extends Component {
    render() {
        return (
            <div>
                <Container >
                    <h2>You are now viewing data for...</h2>
                    <NewCases />
                </Container>
            </div>
        )
    }
}
