import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { App } from './Sources/Components/Containers'
import { reducers } from "./Reducers"
import storeFactory from "./Store";

window.React = React;
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

const store = storeFactory(false, {});
render(

    <Provider store={store}>
            <App />
    </Provider>,
    document.getElementById('root')

);
