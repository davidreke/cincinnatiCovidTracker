import React, { Component } from 'react'
import * as d3 from 'd3'

export default class NewCasesGraph extends Component {

    componentDidUpdate = () => {
       
        let covidArray = Object.entries(this.props.data.cases);

        for(let i = covidArray.length - 1; i > 1; i--){
            let currentDay =parseInt(covidArray[i][1])
            let previousDay =parseInt((covidArray[(i-1)][1]) || 0)
            covidArray[i][1] = currentDay - previousDay
        }

        for(let j = 0; j <covidArray.length; j++){
            covidArray[j][0] = new Date(covidArray[j][0])
        }

        // console.log(covidArray)

        this.updateGraph(covidArray)
    }

    updateGraph(data){
        // console.log('data: ', data)
        
        // tweem
        const widthTween = (d) => {

            let i = d3.interpolate(0, x.bandwidth());

            return function (t){
                return i(t)
            }

        }

        // dimensions
        const dimensions = {
            height: 500,
            width: 1000
        }

        const margin = {top: 20, right: 20, bottom: 100, left: 100}



        const svg = d3.select('.canvas')
            .append('svg')
            .attr('width', dimensions.width)
            .attr('height',dimensions.height)

        const graphWidth = dimensions.width -margin.left - margin.right
        const graphHeight = dimensions.height - margin.top - margin.bottom

        // create graph
        const graph = svg.append('g')
            .attr('width', graphWidth)
            .attr('height', graphHeight)
            .attr('transform', `translate(${margin.left}, ${margin.top})`)

        const xAxisGroup = graph.append('g')
            .attr('transform', `translate(0, ${graphHeight})`);

        // set x axis text
        xAxisGroup.selectAll('text')
            .attr('transform', 'rotate(-40)')
            .attr('text-anchor', 'end')
            .attr('fill','grey')

        const yAxisGroup = graph.append('g');

        // create y scale
        const y = d3.scaleLinear()
            .range([ graphHeight, 0])

        // cretae a band scale
        const x = d3.scaleBand()
            .range([0, graphWidth])
            .paddingInner(0.2)
            .paddingOuter(0.2)

            // create the axae
            const xAxis = d3.axisBottom(x)
                .tickFormat(d3.timeFormat("%b"))
                .ticks(d3.timeMonth.every(2))

            const yAxis = d3.axisLeft(y)
                .ticks(4)
                .tickFormat(d =>  `${d.toLocaleString()} cases`);


            const t = d3.transition().duration(750)

            // join data to rects
            const rects = graph.selectAll('rect')
            .data(data)

            // remove exit selection
            rects.exit().remove();

            // update any scales (domains)
            y.domain([0,d3.max(data, d => d[1])]);
            x.domain(data.map(item => item[0]));

            // update current shapes in the dom
            rects.attr('width', x.bandwidth)
                .attr('fill', 'orange')
                .attr('x', (d) => x(d[0]))

         //handle enter selection
        // append the enter section to the DOM
        rects.enter()
            .append('rect')
            .attr('width', 0)
            .attr('height',0)
            .attr('y', graphHeight)
            .attr('fill', '#5FA19E')
            .attr('x', (d) => x(d[0]))
            .merge(rects)
            .transition(t)
            .attrTween('width', widthTween)
            .attr('y', (d) => {
                return y(d[1])
            })
            .attr('height', d => graphHeight - y(d[1]));

        // add mouseOver
        // graph.selectAll('rect')
        //     .on('mouseover',(event, d) =>{

        //     })

        // call axae
        xAxisGroup.call(xAxis);
        yAxisGroup.call(yAxis);

        console.log(svg)
    }
    render() {
        return (
            <div>
                <h2>New Cases Graph</h2>
                <div className="canvas">

                </div>
            </div>
        )
    }
}
