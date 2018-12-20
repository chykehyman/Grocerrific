import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Header from './common/Header';


const propTypes = {
  children: PropTypes.shape().isRequired
};

const App = ({ children }) => (
  <Fragment>
    <div className="container-fluid">
      <Header />
    </div>
    <div className="container main-content">
      {children}
    </div>
  </Fragment>
);

App.propTypes = propTypes;

export default App;
