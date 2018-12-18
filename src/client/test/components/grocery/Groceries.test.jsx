import { Groceries } from '../../../components/grocery/Groceries';

describe('<Groceries /> component', () => {
  const setup = () => {
    const props = {
      groceries: {
        isFetching: false,
        isProcessing: false,
        groceries: []
      },
      actions: {
        fetchAllGroceries: jest.fn(),
        addGrocery: jest.fn(() => Promise.resolve()),
        deleteGrocery: jest.fn(),
        purchaseOrDropGrocery: jest.fn()
      }
    };

    const state = {
      name: '',
      errors: {},
      selectedId: '',
      action: ''
    };

    return {
      shallowWrapper: shallow(<Groceries {...props} />),
      props,
      state
    };
  };

  const event = {
    target: {
      name: 'tomato'
    },
    preventDefault: jest.fn(),
    persist: jest.fn()
  };


  it('should render without crashing', () => {
    const { shallowWrapper } = setup();

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('should display <Loader /> component when `isFetching` is set to true', () => {
    const { shallowWrapper, props } = setup();

    shallowWrapper.setProps({
      ...props,
      groceries: {
        ...props.groceries,
        isFetching: true
      }
    });

    expect(shallowWrapper.find('MDSpinner')).toHaveLength(1);
  });

  it('should display `Adding...` as button value when `isProcessing` is set to true', () => {
    const { shallowWrapper, props } = setup();

    shallowWrapper.setProps({
      ...props,
      groceries: {
        ...props.groceries,
        isProcessing: true
      }
    });

    expect(shallowWrapper.find('button').text()).toEqual('Adding...');
  });

  it('invokes `componentDidMount` when mounted', () => {
    const { shallowWrapper } = setup();
    const cdmSpy = jest.spyOn(Groceries.prototype, 'componentDidMount');

    shallowWrapper.instance().componentDidMount();
    expect(cdmSpy).toHaveBeenCalled();
  });

  it('invokes handleOnChange method', () => {
    const { shallowWrapper } = setup();
    const handleOnChangeSpy = jest
      .spyOn(shallowWrapper.instance(), 'handleOnChange');

    shallowWrapper.instance().handleOnChange(event);

    expect(handleOnChangeSpy).toHaveBeenCalled();
  });

  it('invokes handleOnFocus method', () => {
    const { shallowWrapper } = setup();
    const handleOnFocusSpy = jest.spyOn(shallowWrapper.instance(), 'handleOnFocus');

    shallowWrapper.instance().handleOnFocus(event);

    expect(handleOnFocusSpy).toHaveBeenCalled();
  });

  it('invokes handleOnSubmit method', () => {
    const { shallowWrapper } = setup();
    const handleOnSubmitSpy = jest.spyOn(shallowWrapper.instance(), 'handleOnSubmit');
    shallowWrapper.instance().handleOnSubmit(event);

    expect(handleOnSubmitSpy).toHaveBeenCalled();
  });

  it('should throw submit errors when name field is invalid', () => {
    const { shallowWrapper, state } = setup();

    const buttonClick = () => shallowWrapper.find('button').first().simulate('click', event);

    buttonClick();
    expect(shallowWrapper.instance().state.error).toEqual({
      name: 'A minimum of 3 characters is required'
    });

    shallowWrapper.setState({
      ...state, name: '123'
    });

    buttonClick();
    expect(shallowWrapper.instance().state.error).toEqual({
      name: 'field must only contain letters'
    });
  });

  it('should submit item when all validations are met', () => {
    const { shallowWrapper, state } = setup();

    shallowWrapper.setState({
      ...state, name: 'Lemon'
    });

    shallowWrapper.find('button').first().simulate('click', event);

    expect(shallowWrapper.instance().state.error).toEqual({});
  });

  it('should invoke handleOnDelete method', () => {
    const { shallowWrapper } = setup();
    const handleOnDeleteSpy = jest.spyOn(shallowWrapper.instance(), 'handleOnDelete');
    shallowWrapper.instance().handleOnDelete(event);

    expect(handleOnDeleteSpy).toHaveBeenCalled();
  });

  it('should invoke handleOnPurchaseOrDrop method', () => {
    const { shallowWrapper } = setup();
    const handleOnPurchaseOrDropSpy = jest.spyOn(shallowWrapper.instance(), 'handleOnPurchaseOrDrop');
    shallowWrapper.instance().handleOnPurchaseOrDrop(event);

    expect(handleOnPurchaseOrDropSpy).toHaveBeenCalled();
  });
});
