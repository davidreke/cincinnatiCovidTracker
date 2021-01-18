import React, { Component } from 'react'
import axios from 'axios'
import NewCasesGraph from './graphComponents/NewCasesGraph'
import {unitedStates, states, counties} from '../functions/fetches.js'

export default class NewCases extends Component {

   
    state = {data: []};
  

    componentDidMount = () => {
        this.fetchData(this.props.location)
    }

    componentDidUpdate = (prevProps) =>{
        console.log(prevProps)
        if(prevProps.location !== this.props.location){
            this.fetchData(this.props.location)
        }
        
    }

// all ohio counties
// https://disease.sh/v3/covid-19/historical/usacounties/ohio?lastdays=all

    fetchData (location){
        var data= []

        switch(location){
            case 'United States':
                unitedStates().then(res => {
                    // console.log('res: ',res)
                    this.setState({data: res})
                })
                
                break;
            case 'Ohio':
            case 'Indiana':
            case 'Kentucky':
                states(this.props.location).then(res =>{
                    this.setState({data: res})
                })
            case 'Hamilton County':
                counties('ohio','hamilton').then(res =>{
                    // console.log(res)
                        this.setState({data: res})
                    })
                break;
            default:
                
                break;  
        }
        
    }

    render() {
        // console.log('location props: ', this.props.location)
        var locationView = this.props.location === 'United States'? "The United States": this.props.location;

        // console.log(locationView)
        return (
            <div>
                <h2>New Cases in <span className='location'>{locationView}</span></h2>
                <NewCasesGraph input={this.state.data} />
            </div>
        )
    }
}
