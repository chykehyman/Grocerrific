import GroceryItem from '../../../components/grocery/GroceryItem';

describe('<GroceryItem /> component', () => {
  const setup = () => {
    const props = {
      item: {
        _id: 'myID123',
        name: 'tomato',
        purchaseStatus: false
      },
      isProcessing: false,
      selectedId: 'myID123',
      action: '',
      deleteItem: jest.fn(),
      purchaseOrDropItem: jest.fn()
    };

    return {
      shallowWrapper: shallow(<GroceryItem {...props} />),
      props
    };
  };


  it('should render without crashing', () => {
    const { shallowWrapper } = setup();

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('should show a strike-through class when purchaseStatus is set to true', () => {
    const { shallowWrapper, props } = setup();

    shallowWrapper.setProps({
      ...props,
      item: {
        ...props.item, purchaseStatus: true
      }
    });

    expect(shallowWrapper.find('.strike-through')).toHaveLength(1);
    expect(shallowWrapper.find('button').first().text()).toEqual('Drop');
  });

  it('should invoke the purchaseOrDropItem method while showing a <Loader /> component', () => {
    const { shallowWrapper, props } = setup();

    shallowWrapper.find('button').first().simulate('click', {});

    shallowWrapper.setProps({
      ...props,
      isProcessing: true,
      action: 'purchase or drop'
    });

    expect(props.purchaseOrDropItem).toHaveBeenCalledWith(props.item._id);
    expect(shallowWrapper.find('MDSpinner')).toHaveLength(1);
    expect(shallowWrapper.find('button').first().text()).toEqual('Buy');
  });

  it('should invoke the deleteItem method while showing a <Loader /> component', () => {
    const { shallowWrapper, props } = setup();

    shallowWrapper.find('button').last().simulate('click', {});

    shallowWrapper.setProps({
      ...props,
      isProcessing: true,
      action: 'delete'
    });

    expect(props.deleteItem).toHaveBeenCalledWith(props.item._id);
    expect(shallowWrapper.find('MDSpinner')).toHaveLength(1);
    expect(shallowWrapper.find('button').first().text()).toEqual('Buy');
  });
});
