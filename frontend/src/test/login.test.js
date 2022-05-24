import { render, screen } from '@testing-library/react';
import Login from '../containers/Login';
import createStore from '../store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

test('renders login page', () => {
  const { store, _ } = createStore();

  render(<Provider store={store}>
    <Router>
      <Login />
    </Router>
  </Provider>);
  const textbox = screen.getByRole('textbox');
  expect(textbox).toBeRequired();
  const button = screen.getByText('Login');
  expect(button).toBeDisabled();
});
