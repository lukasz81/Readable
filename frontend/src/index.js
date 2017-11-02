import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
// import { createStore, applyMiddleware, compose } from 'redux';
// import reducer from './reducers';
import App from './app';
// import { Provider } from 'react-redux';

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
