import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter } from "react-router-dom";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { reducer as form } from "redux-form";
import { profileReducer as profile } from "./profile/reducer";
import { loginReducer as loggedIn } from "./login/reducer";
import { saveState, loadState } from "./localstorage";
import { throttle } from "lodash";

const persistedState = loadState();

const rootReducer = combineReducers({
  loggedIn,
  profile,
  form
});

const store = createStore(
  rootReducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(
  throttle(() => {
    saveState({
      loggedIn: store.getState().loggedIn,
      profile: store.getState().profile
    });
  }),
  1000
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
