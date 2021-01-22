import React, { Component } from "react";
import axios from "axios";
import NewDeathsGraph from "./graphComponents/NewDeathsGraph";
import {
  unitedStates,
  states,
  counties,
  cincyMSA,
} from "../functions/fetchDeaths";

export default class NewDeaths extends Component {
  state = { data: [] };

  componentDidMount = () => {
    this.fetchData(this.props.location);
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.location !== this.props.location) {
      this.fetchData(this.props.location);
    }
  }



  fetchData(location) {
    var data = [];

    switch (location) {
      case "United States":
        unitedStates().then((res) => {
          // console.log('res: ',res)
          this.setState({ data: res });
        });

        break;
      case "Ohio":
      case "Indiana":
      case "Kentucky":
        states(this.props.location).then((res) => {
          this.setState({ data: res });
        });
        break;
      case "Hamilton County":
        counties("ohio", "hamilton").then((res) => {
          console.log(res);
          this.setState({ data: res });
        });
        break;
      case "Butler County":
        counties("ohio", "butler").then((res) => {
          this.setState({ data: res });
        });
        break;
      case "Clermont County":
        counties("ohio", "clermont").then((res) => {
          this.setState({ data: res });
        });
        break;
      case "Brown County":
        counties("ohio", "brown").then((res) => {
          this.setState({ data: res });
        });
        break;
      case "Warren County":
        counties("ohio", "warren").then((res) => {
          this.setState({ data: res });
        });
        break;
      case "Boone County":
        counties("kentucky", "boone").then((res) => {
          this.setState({ data: res });
        });
        break;
      case "Bracken County":
        counties("kentucky", "bracken").then((res) => {
          this.setState({ data: res });
        });
        break;
      case "Campbell County":
        counties("kentucky", "campbell").then((res) => {
          this.setState({ data: res });
        });
        break;
      case "Gallatin County":
        counties("kentucky", "gallatin").then((res) => {
          this.setState({ data: res });
        });
        break;
      case "Grant County":
        counties("kentucky", "grant").then((res) => {
          this.setState({ data: res });
        });
        break;
      case "Kenton County":
        counties("kentucky", "kenton").then((res) => {
          this.setState({ data: res });
        });
        break;
      case "Pendleton County":
        counties("kentucky", "pendleton").then((res) => {
          this.setState({ data: res });
        });
        break;
      case "Dearborn County":
        counties("indiana", "dearborn").then((res) => {
          this.setState({ data: res });
        });
        break;
      case "Franklin County":
        counties("indiana", "franklin").then((res) => {
          this.setState({ data: res });
        });
        break;
      case "Ohio County":
        counties("indiana", "ohio").then((res) => {
          this.setState({ data: res });
        });
        break;
      case "Cincinnati MSA":
        cincyMSA().then((res) => {
          // console.log("response from fetch function", res);
          this.setState({ data: res });
        });
        break;

      default:
        break;
    }
  }

  render() {
    // console.log('location props: ', this.props.location)
    var locationView =
      this.props.location === "United States"
        ? "The United States"
        : this.props.location;

    // console.log(locationView)
    return (
      <div>
        <h2>
          New Deaths in <span className="location">{locationView}</span>
        </h2>
        <NewDeathsGraph input={this.state.data} />
      </div>
    );
  }
}
