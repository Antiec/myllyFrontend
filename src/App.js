import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.css";
import Main from "./Main/Main";
import registerServiceWorker from "./registerServiceWorker";

render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
