/* eslint-disable no-undef */
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'

import { setupStore } from './store'

window.Popper = require("popper.js").default;
window.$ = window.jQuery = require("jquery");
require("bootstrap");

const store = setupStore()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <App />
    </Provider>
)

reportWebVitals()
