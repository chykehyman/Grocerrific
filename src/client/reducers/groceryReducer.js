import types from '../actions/actionTypes';

const initialState = {
  groceries: [],
  isFetching: false,
  isProcessing: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.IS_FETCHING:
      return {
        ...state,
        isFetching: action.bool
      };
    case types.IS_PROCESSING:
      return {
        ...state,
        isProcessing: action.bool
      };
    case types.FETCH_GROCERIES_SUCCESS:
      return {
        ...state,
        groceries: action.groceries
      };
    case types.ADD_GROCERY_SUCCESS:
      return {
        ...state,
        groceries: [action.grocery, ...state.groceries]
      };
    case types.DELETE_GROCERY_SUCCESS:
      return {
        ...state,
        groceries: [
          ...state.groceries.filter(grocery => grocery._id !== action.id)
        ]
      };
    case types.PURCHASE_OR_DROP_GROCERY_SUCCESS:
      return {
        ...state,
        groceries: state.groceries.map((grocery) => {
          if (grocery._id === action.payload._id) {
            const { purchaseStatus } = action.payload;
            return { ...grocery, purchaseStatus };
          }
          return grocery;
        })
      };
    default:
      return state;
  }
};
