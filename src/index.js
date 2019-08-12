import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import ApplicationLayout from "../src/components/ApplicationLayout";
import * as serviceWorker from "./serviceWorker";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import { fetchLocation } from "./actions/LocationAction";

const store = configureStore();
store.dispatch(fetchLocation());

ReactDOM.render(
  <Provider store={store}>
    <ApplicationLayout />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
