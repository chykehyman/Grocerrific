import React from 'react';
import { array } from 'prop-types';

import GroceryItem from './GroceryItem';

const propTypes = {
  items: array.isRequired
};

const GroceryItemList = ({ items }) => (
  <table className="table table-hover">
    <thead>
      <tr>
        <th>&nbsp;</th>
        <th>Name</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {items.map(item => (
        <GroceryItem key={item._id} item={item} />
      ))}
    </tbody>
  </table>
);

GroceryItemList.propTypes = propTypes;

export default GroceryItemList;
