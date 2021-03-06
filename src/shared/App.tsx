import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Home, Detail } from "../pages";

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/practice" component={Detail} />
      </div>
    );
  }
}

export default App;
