// @flow

import { applyMiddleware, createStore, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import extractions, { type EXTRACTIONS_STATE } from "./extractions";
import coffees, { type COFFEES_STATE } from "./coffees";
import grinder, { type GRINDER_STATE } from "./grinder";

const rootReducer = combineReducers({
  extractions,
  coffees,
  grinder
});

let composer = null;

if (process.env.NODE_ENV !== "production") {
  composer = composeWithDevTools;
} else {
  composer = compose;
}

export type STORE_STATE = {
  coffees: COFFEES_STATE,
  extractions: EXTRACTIONS_STATE,
  grinder: GRINDER_STATE
};

const store = createStore(rootReducer, composer(applyMiddleware(thunk)));

export default store;
