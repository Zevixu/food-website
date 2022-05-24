import { render, screen } from '@testing-library/react';
import MyCart from '../containers/myCart';
import createStore from '../store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

test('renders myCart page', () => {
  const { store, _ } = createStore();
  render(<Provider store={store}>
    <Router>
      <MyCart />
    </Router>
  </Provider>);

  const emptyText = screen.getByText('Please login!');
  expect(emptyText).toBeInTheDocument();
});
