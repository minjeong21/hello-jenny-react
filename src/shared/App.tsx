import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Home, Detail, Speaking } from "../pages";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/random/:id" component={Detail} />
        <Route path="/theme/:theme/:id" component={Detail} />
        <Route path="/theme/:theme" component={Detail} />
        <Route path="/level/:level/:id" component={Detail} />
        <Route path="/level/:level" component={Detail} />
        <Route path="/speaking" component={Speaking} />
      </Switch>
    );
  }
}

export default App;
