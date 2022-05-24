import { render, screen, within } from '@testing-library/react';
import Restaraunt from '../containers/aman_random/Restaraunt';
import createStore from '../store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

test('renders restaurant page', () => {
  const { store, _ } = createStore();
  render(<Provider store={store}>
    <Router>
      <Restaraunt />
    </Router>
  </Provider>);

  const restaurantList = screen.getByRole('list');
  expect(restaurantList).toBeInTheDocument();
});
