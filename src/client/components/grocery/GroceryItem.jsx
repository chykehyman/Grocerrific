import React from 'react';
import {
  shape, string, bool, func, number
} from 'prop-types';
import Loader from 'react-md-spinner';

const propTypes = {
  item: shape({
    name: string.isRequired,
    purchaseStatus: bool.isRequired
  }).isRequired,
  isProcessing: bool.isRequired,
  selectedId: string.isRequired,
  action: string.isRequired,
  deleteItem: func.isRequired,
  purchaseOrDropItem: func.isRequired
};

const GroceryItem = ({
  item: { _id, name, purchaseStatus }, selectedId, action,
  isProcessing, deleteItem, purchaseOrDropItem
}) => {
  let listWrapper = 'list-unstyled';
  if (purchaseStatus) {
    listWrapper += ' strike-through';
  }

  const isPurchaseOrDrop = (isProcessing && selectedId === _id && action === 'purchase or drop');
  const isDelete = (isProcessing && selectedId === _id && action === 'delete');

  return (
    <tr>
      <td>&nbsp;</td>
      <td className={listWrapper}>{name}</td>
      <td>
        <button
          type="button"
          disabled={isPurchaseOrDrop}
          className={`btn btn-sm ${purchaseStatus ? 'btn-outline-primary' : 'btn-primary'}`}
          onClick={() => purchaseOrDropItem(_id)}>
          {purchaseStatus ? 'Drop' : 'Buy'}
        </button>
        <span className="pl-2">{isPurchaseOrDrop && <Loader size="15" />}</span>
      </td>
      <td>
        <button
          type="button"
          disabled={isDelete}
          className="btn btn-outline-danger btn-sm"
          onClick={() => deleteItem(_id)}>
          Delete
        </button>
        <span className="pl-2">{isDelete && <Loader size="15" />}</span>
      </td>
    </tr>
  );
};

GroceryItem.propTypes = propTypes;

export default GroceryItem;
