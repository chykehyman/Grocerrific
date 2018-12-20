import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import toastr from 'toastr';

import Routes from './Routes';
import configureStore from './store/store.config';

import '../../node_modules/bootstrap/dist/css/bootstrap.min';
import '../../node_modules/toastr/build/toastr.min.css';
import './assets/styles/main';

toastr.options = {
  showMethod: 'slideDown',
  hideMethod: 'slideUp',
  closeMethod: 'slideUp',
  progressBar: true,
  closeButton: true,
  hideDuration: 500,
  positionClass: 'toast-top-center',
  timeOut: 3000
};

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Routes />
    </Router>
  </Provider>,
  document.getElementById('app')
);

if (module.hot) module.hot.accept();
