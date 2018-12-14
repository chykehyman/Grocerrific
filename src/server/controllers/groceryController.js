import { Types } from 'mongoose';

import GroceryModel from '../models/groceryModel';
import dataResponse from '../helpers/dataResponse';

class GroceryController {
  static serverError = 'Internal server error';

  static noItemFound = 'Item not found';

  static getAllItems = (request, response) => {
    GroceryModel.find({}, '_id name purchaseStatus')
      .then((items) => {
        if (items.length === 0) {
          return dataResponse.success(response, 200, 'There are no items in the store', items);
        }

        return dataResponse.success(response, 200, 'All items retreived successfully', items);
      })
      .catch(() => dataResponse.error(response, 500, GroceryController.serverError));
  }

  static createItem = async (request, response) => {
    const { name } = request.body;

    const foundItem = await GroceryModel.findOne({ name });

    if (foundItem) {
      return dataResponse.error(response, 409, `You already have ${foundItem.name} in your list`);
    }

    const grocery = new GroceryModel({ name });

    return grocery.save()
      .then(item => dataResponse.success(response, 201, 'Item has been added', item))
      .catch(() => dataResponse.error(response, 400, 'Unable to save item'));
  }

  static updateItem = (request, response) => {
    const { _id } = request.params;

    if (!Types.ObjectId.isValid(_id)) {
      return dataResponse.error(response, 422, 'Invalid item ID');
    }

    return GroceryModel.findOne({ _id })
      .then((item) => {
        if (!item) {
          return dataResponse.error(response, 404, GroceryController.noItemFound);
        }

        return GroceryModel.findOneAndUpdate({ _id: item._id },
          { purchaseStatus: !item.purchaseStatus }, { new: true })
          .then((updatedItem) => {
            let message = `${updatedItem.name} has been purchased`;
            if (!updatedItem.purchaseStatus) {
              message = `${updatedItem.name} has been dropped`;
            }
            return dataResponse.success(response, 200, message, updatedItem);
          })
          .catch(() => dataResponse.error(response, 500, GroceryController.serverError));
      })
      .catch(() => dataResponse.error(response, 500, GroceryController.serverError));
  }


  static deleteItem = async (request, response) => {
    const { _id } = request.params;

    if (!Types.ObjectId.isValid(_id)) {
      return dataResponse.error(response, 422, 'Invalid item ID');
    }

    try {
      const deletedItem = await GroceryModel.findOneAndDelete({ _id });
      if (!deletedItem) {
        return dataResponse.error(response, 404, GroceryController.noItemFound);
      }
      return dataResponse.success(response, 200, `${deletedItem.name} has been deleted`, { id: deletedItem._id });
    } catch (e) {
      return dataResponse.error(response, 500, GroceryController.serverError);
    }
  }
}

export default GroceryController;
