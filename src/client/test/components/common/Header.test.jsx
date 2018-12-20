import Header from '../../../components/common/Header';

describe('<Header /> component', () => {
  const shallowWrapper = shallow(<Header />);

  it('renders the header component without crashing', () => {
    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('should have two children', () => {
    expect(shallowWrapper.find('.header-container').props().children).toHaveLength(2);
    expect(shallowWrapper.find('NavLink').first().prop('to')).toBe('/');
    expect(shallowWrapper.find('NavLink').last().prop('to')).toBe('/shop');
  });

  describe('Proper NavLink switching', () => {
    const renderHeader = path => mount(
      <MemoryRouter initialEntries={[path]}>
        <Header />
      </MemoryRouter>
    );
    const expectActiveLink = component => expect(
      component
        .find('.active').at(2).text()
    );
    it('is active when we are in the home route', () => {
      const component = renderHeader('/');

      expectActiveLink(component).toBe('Home');
    });
    it('is active when we switch to shop route', () => {
      const component = renderHeader('/shop');

      expectActiveLink(component).toBe('Shop');
    });
  });
});
