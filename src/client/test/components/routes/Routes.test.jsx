import { Provider } from 'react-redux';
import Routes from '../../../Routes';
import HomePage from '../../../components/Home/Home';
import Groceries from '../../../components/grocery/Groceries';
import NotFoundPage from '../../../components/common/NotFoundPage';
import configureStore from '../../../store/store.config';

const renderRoutes = path => mount(
  <MemoryRouter initialEntries={[path]}>
    <Provider store={configureStore()}>
      <Routes />
    </Provider>
  </MemoryRouter>
);

describe('<Routes /> component', () => {
  it('renders home page on initial route', () => {
    const component = renderRoutes('/');

    expect(component.find(HomePage)).toHaveLength(1);
  });

  it('renders groceries page for /shop', () => {
    const component = renderRoutes('/shop');

    expect(component.find(Groceries)).toHaveLength(1);
  });

  it('renders not found page for invalid routes', () => {
    const component = renderRoutes('/invalidRoute');

    expect(component.find(NotFoundPage)).toHaveLength(1);
  });
});
