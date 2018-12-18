import Home from '../../../components/Home/Home';


describe('<Home /> component test', () => {
  it('renders home page component without crashing', () => {
    const shallowWrapper = shallow(<Home />);
    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
