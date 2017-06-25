import React from 'react'
import { render } from "react-dom"
import { App } from './Components/Containers'
import { Provider } from 'react-redux'
import storeFactory from "../Store"

const store = storeFactory(false, window.__INITIAL_STATE__)

window.React = React;
window.store = store;

render(
    <Provider store={store}>
            <App/>
    </Provider>,
    document.getElementById("react-container")
);
