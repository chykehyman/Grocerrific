import GroceryItemList from '../../../components/grocery/GroceryItemList';

describe('<GroceryItemList /> component', () => {
  const setup = () => {
    const props = {
      items: [],
      isProcessing: false,
      selectedId: 'myID123',
      action: '',
      deleteItem: jest.fn(),
      purchaseOrDropItem: jest.fn()
    };

    return {
      shallowWrapper: shallow(<GroceryItemList {...props} />),
      props
    };
  };


  it('should render without crashing', () => {
    const { shallowWrapper } = setup();

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('should show no items when items array is empty', () => {
    const { shallowWrapper } = setup();

    expect(shallowWrapper.find('p.lead').text()).toEqual('There are no items in the store');
    expect(shallowWrapper.find('GroceryItem')).toHaveLength(0);
  });

  it('should show <GroceryItem /> component when items lenght is > 0', () => {
    const { shallowWrapper, props } = setup();
    const newProps = {
      ...props,
      items: [{}, {}]
    };
    shallowWrapper.setProps(newProps);

    expect(shallowWrapper.find('p.lead')).toHaveLength(0);
    expect(shallowWrapper.find('GroceryItem')).toHaveLength(newProps.items.length);
  });
});
