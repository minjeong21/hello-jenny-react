import React from "react";
import ReactDOM from "react-dom";
import "./styles/globals.css";
import Root from "./client/Root";
import { StoreProvider } from "states/Context";
import { RootStore } from "states/RootStore";

const rootStore = new RootStore();

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider value={rootStore}>
      <Root />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
