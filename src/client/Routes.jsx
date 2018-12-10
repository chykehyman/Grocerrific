import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/common/Header';
import HomePage from './components/Home/Home';
import Groceries from './components/grocery/Groceries';
import NoPageFound from './components/common/NotFoundPage';


const Routes = () => (
  <BrowserRouter>
    <Fragment>
      <div className="container-fluid">
        <Header />
      </div>
      <div className="container main-content">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={Groceries} />
          <Route component={NoPageFound} />
        </Switch>
      </div>
    </Fragment>
  </BrowserRouter>
);

export default Routes;
