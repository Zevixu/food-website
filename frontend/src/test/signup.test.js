import { render, screen } from '@testing-library/react';
import SignUp from '../containers/sign-up/index';
import createStore from '../store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

test('renders sign up page', () => {
  const { store, _ } = createStore();
  render(<Provider store={store}>
    <Router>
      <SignUp />
    </Router>
  </Provider>);
  const textbox = screen.getByRole('textbox', { name: 'Email*' });
  expect(textbox).toBeRequired();
  const ad = screen.getByRole('textbox', { name: 'Address' });
  expect(ad).toBeEnabled();
  const fn = screen.getByRole('textbox', { name: 'First Name' });
  expect(fn).toBeEnabled();
  const ln = screen.getByRole('textbox', { name: 'Last Name' });
  expect(ln).toBeEnabled();
  const phone = screen.getByRole('textbox', { name: 'Phone' });
  expect(phone).toBeEnabled();
  const button = screen.getByText('Submit');
  expect(button).toBeEnabled();
});
