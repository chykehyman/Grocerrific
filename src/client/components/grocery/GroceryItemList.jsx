import React from 'react';
import { array, func, string } from 'prop-types';

import GroceryItem from './GroceryItem';

const propTypes = {
  items: array.isRequired,
  selectedId: string.isRequired,
  action: string.isRequired,
  deleteItem: func.isRequired,
  purchaseOrDropItem: func.isRequired
};

const renderNoItemsFound = () => (
  <div className="no-items">
    <i className="fa fa-exclamation-triangle fa-3x pb-3 d-block" />
    <p className="lead">There are no items in the store</p>
  </div>
);

const renderList = (items, isProcessing, selectedId, action, deleteItem, purchaseOrDropItem) => (
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
        <GroceryItem
          key={item._id}
          item={item}
          isProcessing={isProcessing}
          selectedId={selectedId}
          action={action}
          deleteItem={deleteItem}
          purchaseOrDropItem={purchaseOrDropItem} />
      ))}
    </tbody>
  </table>
);

const GroceryItemList = ({
  items, isProcessing, selectedId, action, deleteItem, purchaseOrDropItem
}) => {
  if (items.length === 0) {
    return renderNoItemsFound();
  }
  return renderList(items, isProcessing, selectedId, action, deleteItem, purchaseOrDropItem);
};

GroceryItemList.propTypes = propTypes;

export default GroceryItemList;
