import reducer from '../../reducers/groceryReducer';
import types from '../../actions/actionTypes';

describe('grocery reducer', () => {
  const initialState = {
    groceries: [],
    isFetching: false,
    isProcessing: false
  };

  describe('initial state', () => {
    it('should return apppropiate initial state', (done) => {
      expect(reducer(undefined, {})).toEqual(initialState);
      done();
    });
  });

  it('should set fetch loader to true when passed IS_FETCHING',
    (done) => {
      const action = {
        type: types.IS_FETCHING,
        bool: true
      };

      const newState = reducer(initialState, action);
      expect(newState.isFetching).toEqual(true);
      expect(newState.groceries).toEqual([]);
      expect(newState.isProcessing).toEqual(false);
      done();
    });

  it('should set processing loader to true when passed IS_PROCESSING',
    (done) => {
      const action = {
        type: types.IS_PROCESSING,
        bool: true
      };

      const newState = reducer(initialState, action);
      expect(newState.isFetching).toEqual(false);
      expect(newState.groceries).toEqual([]);
      expect(newState.isProcessing).toEqual(true);
      done();
    });

  it('should set goceries to empty array when passed FETCH_GROCERIES_SUCCESS',
    (done) => {
      const action = {
        type: types.FETCH_GROCERIES_SUCCESS,
        groceries: []
      };

      const newState = reducer(initialState, action);
      expect(newState.isFetching).toEqual(false);
      expect(newState.groceries).toEqual([]);
      expect(newState.isProcessing).toEqual(false);
      done();
    });

  it('should set goceries to array containing one item/object when passed ADD_GROCERY_SUCCESS',
    (done) => {
      const action = {
        type: types.ADD_GROCERY_SUCCESS,
        grocery: {}
      };

      const newState = reducer(initialState, action);
      expect(newState.isFetching).toEqual(false);
      expect(newState.groceries).toEqual([{}]);
      expect(newState.groceries).toHaveLength(1);
      expect(newState.isProcessing).toEqual(false);
      done();
    });

  it('should set goceries to an empty array when passed DELETE_GROCERY_SUCCESS',
    (done) => {
      const action = {
        type: types.DELETE_GROCERY_SUCCESS,
        id: 'anID'
      };

      const newState = { ...initialState, groceries: [{ name: 'lemon', _id: 'anID' }] };

      const state = reducer(newState, action);
      expect(state.isFetching).toEqual(false);
      expect(state.groceries).toEqual([]);
      expect(state.groceries).toHaveLength(0);
      expect(state.isProcessing).toEqual(false);
      done();
    });

  it('should set goceries to an empty array when passed PURCHASE_OR_DROP_GROCERY_SUCCESS',
    (done) => {
      const action = {
        type: types.PURCHASE_OR_DROP_GROCERY_SUCCESS,
        payload: { _id: 'anID', purchaseStatus: true }
      };

      const newState = {
        ...initialState,
        groceries: [
          { name: 'lemon', _id: 'theID', purchaseStatus: true },
          { name: 'lemon', _id: 'anID', purchaseStatus: false }
        ]
      };

      const state = reducer(newState, action);
      expect(state.isFetching).toEqual(false);
      expect(state.groceries).toHaveLength(2);
      expect(state.groceries[0].purchaseStatus).toEqual(true);
      expect(state.groceries[1].purchaseStatus).toEqual(true);
      expect(state.isProcessing).toEqual(false);
      done();
    });
});
