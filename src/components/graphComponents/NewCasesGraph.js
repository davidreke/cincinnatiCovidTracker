import React, { Component } from 'react'
import * as d3 from 'd3'

export default class NewCasesGraph extends Component {

    componentDidUpdate = (prevProps) => {

        if(!prevProps.input.length){
             this.createGraph(this.props.input)
        } else {
            if(!prevProps.input !== this.props.input){
                this.updateGraph(this.props.input)
                // this.updateGraph(this.props.input)
            }}

        
    }

    // componentDidMount = () => {
    //     console.log(this.props.input)
    //     if(this.props.input.length > 0){
    //         this.createGraph(this.props.input)
    //     }
        
    // }


    

    createGraph(data){
        // console.log('data: ', data)
        
        // tween
        const widthTween = (d) => {

            let i = d3.interpolate(0, graphHeight/data.length);

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
            .attr('class','graph')

            console.log(graph)
        // line path element
        const path = graph.append('path')

        const xAxisGroup = graph.append('g')
            .attr('transform', `translate(0, ${graphHeight})`)
            .attr('class', 'xAxisGroup');

        // set x axis text
        xAxisGroup.selectAll('text')
            .attr('transform', 'rotate(-40)')
            .attr('text-anchor', 'end')
            .attr('fill','grey')

        const yAxisGroup = graph.append('g')
            .attr('class', 'yAxisGroup');

        // d3 line generator
    const line = d3.line()
        .x(function(d){return x(d[0])})
        .y(function(d){return y(d[2])})

        // create y scale
        const y = d3.scaleLinear()
            .range([ graphHeight, 0])

        // create a band scale
        const x = d3.scaleTime().range([0,graphWidth])
            // .paddingInner(0.2)
            // .paddingOuter(0.2);

        // create the axae
        const xAxis = d3.axisBottom(x)
            .ticks(5)
            .tickFormat(d3.timeFormat('%B %d %Y'));

        const yAxis = d3.axisLeft(y)
            .ticks(4)
            .tickFormat(d =>  `${d.toLocaleString()} cases`);


        const t = d3.transition().duration(750)

        console.log('create graph graph: ',graph)
    //  join data to rects
            const rects = graph.selectAll('rect')
            .data(data)

            // remove exit selection
            rects.exit().remove();

            // update any scales (domains)
            y.domain([0,d3.max(data, d => d[1])]);
            x.domain([data[0][0], data[data.length-1][0]]);

            // update path data
            path.data([data])
                .attr('fill', 'none')
                .attr('stroke', '#334040')
                .attr('stroke-width', '2')
                .attr('d', line)

            // update current shapes in the dom
            rects.attr('width', graphWidth / data.length)
                .attr('fill', '#5FA19E')
                .attr('x', (d) => x(d[0]))

         //handle enter selection
        // append the enter section to the DOM
        rects.enter()
            .append('rect')
            .attr('width', 0)
            .attr('height',0)
            .attr('y', graphHeight)
            .attr('fill', '#5FA19E')
            .attr('x', (d) => {
                // console.log(d[0])
                return x(d[0])}
                )
            .merge(rects)
            .transition(t)
            .attrTween('width', widthTween)
            .attr('y', (d) => {return y(d[1])})
            .attr('height', d => {
                // console.log(graphHeight - y(d[1]))
                return graphHeight - y(d[1])}
                );

        // add mouseOver
        // graph.selectAll('rect')
        //     .on('mouseover',(event, d) =>{

        //     })

        // call axae
        xAxisGroup.call(xAxis);
        yAxisGroup.call(yAxis);

    }

    updateGraph(data){
            //    console.log('data: ', data)
        
        // tween
        const widthTween = (d) => {

            let i = d3.interpolate(0, graphHeight/data.length);

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
            .select('svg')
            .attr('width', dimensions.width)
            .attr('height',dimensions.height)

        const graphWidth = dimensions.width -margin.left - margin.right
        const graphHeight = dimensions.height - margin.top - margin.bottom

        // select graph
        const graph = svg.selectAll('g')
            .attr('width', graphWidth)
            .attr('height', graphHeight)
            .attr('transform', `translate(${margin.left}, ${margin.top})`)

        console.log(graph)

        // line path element
        const path = graph.select('path')

        const xAxisGroup = graph.select('g.xAxisGroup')
            .attr('transform', `translate(0, ${graphHeight})`);

        // set x axis text
        xAxisGroup.selectAll('text')
            .attr('transform', 'rotate(-40)')
            .attr('text-anchor', 'end')
            .attr('fill','grey')

        const yAxisGroup = graph.select('g.yAxisGroup');

        // d3 line generator
    const line = d3.line()
        .x(function(d){return x(d[0])})
        .y(function(d){return y(d[2])})

        // create y scale
        const y = d3.scaleLinear()
            .range([ graphHeight, 0])

        // create a band scale
        const x = d3.scaleTime().range([0,graphWidth])
            // .paddingInner(0.2)
            // .paddingOuter(0.2);

        // create the axae
        const xAxis = d3.axisBottom(x)
            .ticks(5)
            .tickFormat(d3.timeFormat('%B %d %Y'));

        const yAxis = d3.axisLeft(y)
            .ticks(4)
            .tickFormat(d =>  `${d.toLocaleString()} cases`);


        const t = d3.transition().duration(750)

        console.log('update graph graph',graph)

    //  join data to rects
            const rects = graph.selectAll('rect')
            .data(data)

            // remove exit selection
            rects.exit().remove();

            // update any scales (domains)
            y.domain([0,d3.max(data, d => d[1])]);
            x.domain([data[0][0], data[data.length-1][0]]);

            // update path data
            path.data([data])
                .attr('fill', 'none')
                .attr('stroke', '#334040')
                .attr('stroke-width', '2')
                .attr('d', line)

            // update current shapes in the dom
            rects.attr('width', graphWidth / data.length)
                .attr('fill', '#5FA19E')
                .attr('x', (d) => x(d[0]))

         //handle enter selection
        // append the enter section to the DOM
        rects.enter()
            .append('rect')
            .attr('width', 0)
            .attr('height',0)
            .attr('y', graphHeight)
            .attr('fill', '#5FA19E')
            .attr('x', (d) => {
                // console.log(d[0])
                return x(d[0])}
                )
            .merge(rects)
            .transition(t)
            .attrTween('width', widthTween)
            .attr('y', (d) => {return y(d[1])})
            .attr('height', d => {
                // console.log(graphHeight - y(d[1]))
                return graphHeight - y(d[1])}
                );

        // add mouseOver
        // graph.selectAll('rect')
        //     .on('mouseover',(event, d) =>{

        //     })

        // call axae
        xAxisGroup.call(xAxis);
        yAxisGroup.call(yAxis);
    }


    render() {
        return (
            <div>
                <div className="canvas">

                </div>
            </div>
        )
    }
}
