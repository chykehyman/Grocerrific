import React from 'react';
import ReactDOM from 'react-dom';

import Routes from './Routes';

import '../../node_modules/bootstrap/dist/css/bootstrap.min';
import './assets/styles/main';


ReactDOM.render(
  <Routes />,
  document.getElementById('app')
);

if (module.hot) module.hot.accept();
