import React, { Component } from "react";
import * as d3 from "d3";
import { transition } from "d3-transition";



export default class NewCasesGraph extends Component {
  componentDidUpdate = (prevProps) => {
    if (!prevProps.input.length) {
      this.createGraph(this.props.input);
    } else {
      if (!prevProps.input !== this.props.input) {
       let caseGraph= d3.select('#cases')
          
        console.log(caseGraph)

       caseGraph.selectAll('svg')
            .remove()

        this.createGraph(this.props.input);
        // this.updateGraph(this.props.input)
      }
    }
  };

  getTransition(duration) {
    return transition()
      .duration(duration);
}

  // componentDidMount = () => {
  //     console.log(this.props.input)
  //     if(this.props.input.length > 0){
  //         this.createGraph(this.props.input)
  //     }

  // }

  handleMouseOver = (event, d) =>{
      d3.select(event.currentTarget)
        .attr("fill", "#334040");
  }

    handleMouseOut = (event, d) => {
  d3.select(event.currentTarget)
    .attr("fill", "#5FA19E");
};


  createGraph(data) {
    
    // console.log('CreateGraph Data: ', data);

    // tween
    const widthTween = (d) => {
      let i = d3.interpolate(0, graphHeight / data.length);

      return function (t) {
        return i(t);
      };
    };

    // dimensions
    const dimensions = {
      height: 500,
      width: 1000,
    };

    const margin = { top: 20, right: 20, bottom: 100, left: 100 };

    const svg = d3
      .select("#cases")
      .append("svg")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height);

    const graphWidth = dimensions.width - margin.left - margin.right;
    const graphHeight = dimensions.height - margin.top - margin.bottom;

    // create graph
    const graph = svg
      .append("g")
      .attr("width", graphWidth)
      .attr("height", graphHeight)
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .attr("class", "graph");

    // console.log(graph);
    // line path element
    const path = graph.append("path");

    const xAxisGroup = graph
      .append("g")
      .attr("transform", `translate(0, ${graphHeight})`)
      .attr("class", "xAxisGroup");

    // set x axis text
    xAxisGroup
      .selectAll("text")
      .attr("transform", "rotate(-40)")
      .attr("text-anchor", "end")
      .attr("fill", "grey");

    const yAxisGroup = graph.append("g").attr("class", "yAxisGroup");

    // d3 line generator
    const line = d3
      .line()
      .x(function (d) {
        return x(d[0]);
      })
      .y(function (d) {
        return y(d[2]);
      });

    // create y scale
    const y = d3.scaleLinear().range([graphHeight, 0]);

    // create a band scale
    const x = d3.scaleTime().range([0, graphWidth]);
    // .paddingInner(0.2)
    // .paddingOuter(0.2);

    // create the axae
    const xAxis = d3
      .axisBottom(x)
      .ticks(5)
      .tickFormat(d3.timeFormat("%B %d %Y"));

    const yAxis = d3
      .axisLeft(y)
      .ticks(4)
      .tickFormat((d) => `${d.toLocaleString()} cases`);

    const t = this.getTransition(750);

    // console.log("create graph graph: ", graph);
    //  join data to rects
    const rects = graph.selectAll("rect").data(data);

    // remove exit selection
    rects.exit().remove();

    // update any scales (domains)
    y.domain([0, d3.max(data, (d) => d[1])]);
    x.domain([data[0][0], data[data.length - 1][0]]);

    // update path data
    path
      .data([data])
      .attr("fill", "none")
      .attr("stroke", "#334040")
      .attr("stroke-width", "2")
      .attr("d", line);

    // update current shapes in the dom
    rects
      .attr("width", graphWidth / data.length)
      .attr("fill", "#5FA19E")
      .attr("x", (d) => x(d[0]));

    //handle enter selection
    // append the enter section to the DOM
    rects
      .enter()
      .append("rect")
      .attr("width", 0)
      .attr("height", 0)
      .attr("y", graphHeight)
      .attr("fill", "#5FA19E")
      .attr("x", (d) => {
        // console.log(d[0])
        return x(d[0]);
      })
      .merge(rects)
      .transition(t)
      .attrTween("width", widthTween)
      .attr("y", (d) => {
        return y(d[1]);
      })
      .attr("height", (d) => {
        // console.log(graphHeight - y(d[1]))
        return graphHeight - y(d[1]);
      })

      //   add mouseover and mousout
      graph.selectAll('rect')
      .on("mouseover", (event, d) => {
        let content = `<div class="tooltip-label">${
          d[0].getMonth() + 1
        }/${d[0].getDate()}/${d[0].getFullYear()}: ${d[1]} New cases</div>`;
        tip.html(content).style("visibility", "visible");
        this.handleMouseOver(event, d);
      })
      .on("mouseout", (event, d) => {
        tip.style("visibility", "hidden");
        this.handleMouseOut(event, d);
      })
      .on("mousemove", (event, d) => {
        tip.style("transform", `translate(${event.pageX}px,${event.pageY}px)`);
      });

    // call axae
    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);


    // add tips
    const tip = d3
      .select("body")
      .append("div")
      .attr("class", "card")
      .style("padding", "8px") // Add some padding so the tooltip content doesn't touch the border of the tooltip
      .style("position", "absolute") // Absolutely position the tooltip to the body. Later we'll use transform to adjust the position of the tooltip
      .style("left", 0)
      .style("top", 0)
      .style("visibility", "hidden");

        // legend variables
        var legendRectSize = 10;
        var legendSpacing = 4 ;

     var legend = graph.append('g')
      .attr('class', 'legend')
      .attr('transform', 'translate(10, 10)')

      legend
        .append("rect")
        .attr("width", legendRectSize)
        .attr("height", legendRectSize/5)
        .style("fill", "#334040")
        .style("stroke", "#334040");

        legend
          .append("text")
          .attr("x", legendRectSize + legendSpacing)
          .attr("y", legendRectSize - legendSpacing)
          .text('seven day moving average');
  }


  render() {
    return (
      <div>
        <div id="cases"></div>
      </div>
    );
  }
}
