import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Home, Detail } from "../pages";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/random/:numid" component={Detail} />
        <Route path="/theme/:theme/:numid" component={Detail} />
        <Route path="/level/:level/:numid" component={Detail} />
      </Switch>
    );
  }
}

export default App;
