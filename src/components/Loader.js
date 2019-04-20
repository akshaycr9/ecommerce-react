import LoadingBar from "react-redux-loading-bar";
import React, { Component } from "react";

class Loader extends Component {
  render() {
    return (
      <header>
        <LoadingBar style={{ backgroundColor: "blue", height: "5px" }} />
      </header>
    );
  }
}

export default Loader;
