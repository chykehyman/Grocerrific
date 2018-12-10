import React from 'react';
import { shape, string, bool } from 'prop-types';

const propTypes = {
  item: shape({
    name: string.isRequired,
    purchaseStatus: bool.isRequired
  }).isRequired
};

const GroceryItem = ({ item: { name, purchaseStatus } }) => {
  let listWrapper = 'list-unstyled';
  if (purchaseStatus) {
    listWrapper += ' strike-through';
  }
  return (
    <tr>
      <td>&nbsp;</td>
      <td className={listWrapper}>{name}</td>
      <td>
        <button
          type="button"
          className="btn btn-primary"
        >
          Buy
        </button>
      </td>
      <td>
        <button
          type="button"
          className="btn btn-outline-danger btn-sm">
          Delete
        </button>
      </td>
    </tr>
  );
};

GroceryItem.propTypes = propTypes;

export default GroceryItem;
