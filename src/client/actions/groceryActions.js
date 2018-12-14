import axios from 'axios';
import types from './actionTypes';
import toast from '../helpers/toast';


const isFetching = bool => ({
  type: types.IS_FETCHING,
  bool
});

const fetchGroceriesSuccess = groceries => ({
  type: types.FETCH_GROCERIES_SUCCESS,
  groceries
});

const purchaseOrDropGroceriesSuccess = payload => ({
  type: types.PURCHASE_OR_DROP_GROCERY_SUCCESS,
  payload
});

const isProcessing = bool => ({
  type: types.IS_PROCESSING,
  bool
});

const addGrocerySuccess = grocery => ({
  type: types.ADD_GROCERY_SUCCESS,
  grocery
});

const deleteGrocerySuccess = id => ({
  type: types.DELETE_GROCERY_SUCCESS,
  id
});

const generalProcessError = error => ({
  type: types.GENERAL_PROCESS_ERROR,
  error
});

export const fetchAllGroceries = () => (dispatch) => {
  dispatch(isFetching(true));
  return axios.get('/api/v1/items')
    .then((response) => {
      dispatch(fetchGroceriesSuccess(response.data.payload));
      dispatch(isFetching(false));
    })
    .catch((error) => {
      dispatch(generalProcessError(error.response.data));
      dispatch(isFetching(false));
    });
};

export const addGrocery = name => (dispatch) => {
  dispatch(isProcessing(true));
  return axios.post('/api/v1/items', { name })
    .then((response) => {
      dispatch(addGrocerySuccess(response.data.payload));
      dispatch(isProcessing(false));
      toast('success', response.data.message);
    })
    .catch((error) => {
      dispatch(generalProcessError(error.response.data.message));
      dispatch(isProcessing(false));
      toast('error', error.response.data.message);
    });
};

export const deleteGrocery = _id => (dispatch) => {
  dispatch(isProcessing(true));
  return axios.delete(`/api/v1/items/${_id}`)
    .then((response) => {
      const { payload: { id }, message } = response.data;
      dispatch(deleteGrocerySuccess(id));
      dispatch(isProcessing(false));
      toast('success', message);
    })
    .catch((error) => {
      dispatch(generalProcessError(error.response.data));
      dispatch(isProcessing(false));
    });
};

export const purchaseOrDropGrocery = _id => (dispatch) => {
  dispatch(isProcessing(true));
  return axios.put(`api/v1/items/${_id}`)
    .then((response) => {
      const { message, payload } = response.data;
      dispatch(purchaseOrDropGroceriesSuccess(payload));
      dispatch(isProcessing(false));
      toast('success', message);
    })
    .catch((error) => {
      dispatch(generalProcessError(error.response.data));
      dispatch(isProcessing(false));
    });
};
