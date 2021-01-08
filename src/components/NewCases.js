import React, { Component } from 'react'
import axios from 'axios'
import NewCasesGraph from './graphComponents/NewCasesGraph'

export default class NewCases extends Component {

     constructor(props) {
    super(props);
    this.state = {data: []};
  }

    componentDidMount = () => {
        this.fetchData()
    }

    fetchData (){
        axios.get('https://disease.sh/v3/covid-19/historical/United%20States?lastdays=all').then( res => {
            // console.log(res.data.timeline)
            this.setState({data: res.data.timeline})
        }
            
        ).catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <h2>new cases</h2>
                <NewCasesGraph data={this.state.data} />
            </div>
        )
    }
}
