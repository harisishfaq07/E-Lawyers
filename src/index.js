import React from 'react';
import reactDom from 'react-dom';
import { Provider } from 'react-redux';
// import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"

import App from './App';
import Store  from "./redux/store/Store"
reactDom.render(<Provider store={Store}><App /></Provider>, document.getElementById("root"));