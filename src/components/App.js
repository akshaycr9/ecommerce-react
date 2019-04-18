import React from "react";
import { Route, Switch, Router } from "react-router-dom";
import history from "../history";
import Navbar from "./Navbar";
import Home from "./Home";
import Cart from "./Cart";

const App = () => {
  return (
    <Router history={history}>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/cart" component={Cart} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
