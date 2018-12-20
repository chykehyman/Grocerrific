import {
  fetchAllGroceries, addGrocery, deleteGrocery, purchaseOrDropGrocery
} from '../../actions/groceryActions';
import types from '../../actions/actionTypes';
import mockData from '../__mocks__/groceryMocks';


describe('grocery actions', () => {
  let store;
  beforeEach(() => {
    moxios.install();
    store = storeMock({});
  });
  afterEach(() => moxios.uninstall());

  describe('fetch all groceries actions', () => {
    it('should fetch all available groceries in store', async (done) => {
      moxios.stubRequest('/api/v1/items', {
        status: 200,
        response: mockData.emptyFetchResponse
      });
      const { payload } = mockData.emptyFetchResponse;

      const expectedActions = [
        { type: types.IS_FETCHING, bool: true },
        { type: types.FETCH_GROCERIES_SUCCESS, groceries: payload },
        { type: types.IS_FETCHING, bool: false }
      ];

      await store.dispatch(fetchAllGroceries());
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('should return `500` when fetching fails', async (done) => {
      moxios.stubRequest('/api/v1/items', {
        status: 500,
        response: mockData.internalServerError
      });
      const { message } = mockData.internalServerError;

      const expectedActions = [
        { type: types.IS_FETCHING, bool: true },
        { type: types.GENERAL_PROCESS_ERROR, error: message },
        { type: types.IS_FETCHING, bool: false }
      ];

      await store.dispatch(fetchAllGroceries());
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  describe('add grocery actions', () => {
    it('should add a grocery to the store', async (done) => {
      moxios.stubRequest('/api/v1/items', {
        status: 201,
        response: mockData.addItemSuccessResponse
      });
      const { payload } = mockData.addItemSuccessResponse;

      const expectedActions = [
        { type: types.IS_PROCESSING, bool: true },
        { type: types.ADD_GROCERY_SUCCESS, grocery: payload },
        { type: types.IS_PROCESSING, bool: false }
      ];

      await store.dispatch(addGrocery('tomato'));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('should return `409` when adding fails', async (done) => {
      moxios.stubRequest('/api/v1/items', {
        status: 409,
        response: mockData.addItemErrorResponse
      });
      const { message } = mockData.addItemErrorResponse;

      const expectedActions = [
        { type: types.IS_PROCESSING, bool: true },
        { type: types.GENERAL_PROCESS_ERROR, error: message },
        { type: types.IS_PROCESSING, bool: false }
      ];

      await store.dispatch(addGrocery('tomato'));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  describe('delete grocery actions', () => {
    it('should delete a grocery from the store', async (done) => {
      const { payload: { id } } = mockData.deleteItemSuccessResponse;

      moxios.stubRequest(`/api/v1/items/${id}`, {
        status: 200,
        response: mockData.deleteItemSuccessResponse
      });

      const expectedActions = [
        { type: types.IS_PROCESSING, bool: true },
        { type: types.DELETE_GROCERY_SUCCESS, id },
        { type: types.IS_PROCESSING, bool: false }
      ];

      await store.dispatch(deleteGrocery(id));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('should return `404` when deleting fails', async (done) => {
      const { payload: { id } } = mockData.deleteItemSuccessResponse;
      moxios.stubRequest(`/api/v1/items/${id}`, {
        status: 404,
        response: mockData.notFoundErrorResponse
      });
      const { message } = mockData.notFoundErrorResponse;

      const expectedActions = [
        { type: types.IS_PROCESSING, bool: true },
        { type: types.GENERAL_PROCESS_ERROR, error: message },
        { type: types.IS_PROCESSING, bool: false }
      ];

      await store.dispatch(deleteGrocery(id));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  describe('purchase or drop grocery actions', () => {
    it('should purchase a grocery from the store', async (done) => {
      const { payload } = mockData.purchaseOrDropSuccessResponse;

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();

        request.respondWith({
          status: 200,
          response: mockData.purchaseOrDropSuccessResponse
        });
      });

      const expectedActions = [
        { type: types.IS_PROCESSING, bool: true },
        { type: types.PURCHASE_OR_DROP_GROCERY_SUCCESS, payload },
        { type: types.IS_PROCESSING, bool: false }
      ];

      await store.dispatch(purchaseOrDropGrocery());
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('should return `404` when purchasing or dropping fails', async (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();

        request.respondWith({
          status: 404,
          response: mockData.notFoundErrorResponse
        });
      });

      const { message } = mockData.notFoundErrorResponse;

      const expectedActions = [
        { type: types.IS_PROCESSING, bool: true },
        { type: types.GENERAL_PROCESS_ERROR, error: message },
        { type: types.IS_PROCESSING, bool: false }
      ];

      await store.dispatch(purchaseOrDropGrocery());
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});
