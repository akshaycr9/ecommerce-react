import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
      </div>
    </BrowserRouter>
  );
};

export default App;
