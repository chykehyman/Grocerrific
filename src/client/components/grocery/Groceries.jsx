import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import GroceryItemList from './GroceryItemList';

const propTypes = {};

const defaultProps = {};

export class Groceries extends Component {
  groceryItems = [
    { _id: 1, name: 'Tomatoes', purchaseStatus: false },
    { _id: 2, name: 'Peanut Butter', purchaseStatus: true },
    { _id: 3, name: 'Carrots', purchaseStatus: true },
    { _id: 4, name: 'Pinnapples', purchaseStatus: false }
  ];

  render() {
    return (
      <Fragment>
        <GroceryItemList items={this.groceryItems} />
      </Fragment>
    );
  }
}

Groceries.propTypes = propTypes;
Groceries.defaultProps = defaultProps;

export default Groceries;
