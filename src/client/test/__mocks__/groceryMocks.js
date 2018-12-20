export default {
  emptyFetchResponse: {
    message: 'There are no items in the store',
    payload: []
  },
  internalServerError: {
    message: 'Internal server error'
  },
  addItemSuccessResponse: {
    message: 'Item has been added',
    payload: {
      purchaseStatus: false,
      _id: '5c18ea26392d9682320b7a88',
      name: 'tomato',
      createdAt: '2018-12-18T12:37:58.658Z',
      updatedAt: '2018-12-18T12:37:58.658Z',
      __v: 0
    }
  },
  addItemErrorResponse: {
    message: 'You already have tomato in your list'
  },
  deleteItemSuccessResponse: {
    message: 'tomato has been deleted',
    payload: {
      id: '5c18d691a8b2267c8d2b19dd'
    }
  },
  notFoundErrorResponse: {
    message: 'Item not found'
  },
  purchaseOrDropSuccessResponse: {
    message: 'tomato has been purchased',
    payload: {
      purchaseStatus: true,
      id: '5c18ea26392d9682320b7a88',
      name: 'tomato',
      createdAt: '2018-12-18T12:37:58.658Z',
      updatedAt: '2018-12-18T13:11:26.917Z',
      __v: 0
    }
  }
};
