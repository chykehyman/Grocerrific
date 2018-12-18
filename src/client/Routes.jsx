import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './components/App';
import HomePage from './components/Home/Home';
import Groceries from './components/grocery/Groceries';
import NoPageFound from './components/common/NotFoundPage';


const Routes = () => (
  <App>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/shop" component={Groceries} />
      <Route component={NoPageFound} />
    </Switch>
  </App>
);

export default Routes;
