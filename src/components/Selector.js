import React, { Component } from 'react'
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Col, Container } from 'reactstrap'

export default class Selector extends Component {

    state = {
        isOpen: false
    }

    toggle = () =>{
        this.setState({isOpen: !this.state.isOpen})
    }

    


    render() {
        var locationView = this.props.location === 'United States'? "The United States": this.props.location;

        
        return (
            <div id="selector">
                <h2>You are now viewing data for 
                    <span>
                        <Dropdown id='dropDown' isOpen={this.state.isOpen} toggle={this.toggle} size='lg'>
                            <DropdownToggle caret>
                                {locationView}
                            </DropdownToggle>
                            <DropdownMenu>
                            <Container>
                                <Row>
                                    <Col>
                                    <DropdownItem header>Choose Location</DropdownItem>
                                    <DropdownItem >Cincinnati MSA</DropdownItem>
                                    <DropdownItem onClick={this.props.changeLocation}>United States</DropdownItem>
                                    <DropdownItem onClick={this.props.changeLocation}>Ohio</DropdownItem>
                                    <DropdownItem onClick={this.props.changeLocation}>Kentucky</DropdownItem>
                                    <DropdownItem onClick={this.props.changeLocation}>Indiana</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem onClick={this.props.changeLocation}>Hamilton County</DropdownItem>
                                    <DropdownItem onClick={this.props.changeLocation}>Butler County</DropdownItem>
                                    <DropdownItem onClick={this.props.changeLocation}>Clermont County</DropdownItem>
                                    <DropdownItem onClick={this.props.changeLocation}>Brown County</DropdownItem>
                                    </Col>
                                    <Col>
                                    <DropdownItem onClick={this.props.changeLocation}>Boone County</DropdownItem>
                                    <DropdownItem onClick={this.props.changeLocation}>Kenton County</DropdownItem>
                                    <DropdownItem onClick={this.props.changeLocation}>Campbell County</DropdownItem>
                                    <DropdownItem onClick={this.props.changeLocation}>Bracken County</DropdownItem>
                                    <DropdownItem onClick={this.props.changeLocation}>Gallatin County</DropdownItem>
                                    <DropdownItem onClick={this.props.changeLocation}>Grant County</DropdownItem>
                                    <DropdownItem onClick={this.props.changeLocation}>Pendleton County</DropdownItem>
                                    <DropdownItem onClick={this.props.changeLocation}>Dearborn County</DropdownItem>
                                    <DropdownItem onClick={this.props.changeLocation}>Franklin County</DropdownItem>
                                    <DropdownItem onClick={this.props.changeLocation}>Ohio County</DropdownItem>
                                    </Col>
                                </Row>
                            </Container>
                            </DropdownMenu>
                        </Dropdown>
                    </span></h2>
                {/* <h2>Select location</h2><Button color='primary'>Cincinnati MSA</Button>
                <Button color='secondary'>United States</Button>
                <Button color='secondary'>Hamilton County</Button>
                <Button color='secondary'>Butler County</Button>
                <Button color='secondary'>Claremont County</Button> */}
            </div>
        )
    }
}
