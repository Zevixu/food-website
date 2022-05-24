import { render, screen } from '@testing-library/react';
import App from '../App';
import createStore from '../store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';


test('renders app', () => {

  const { store, _ } = createStore();
  render(<Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>);
  const linkElement = screen.getByText(/Foodie/i);
  expect(linkElement).toBeInTheDocument();
  const login = screen.getByText('Login');
  expect(login).toBeInTheDocument();
  const signUp = screen.getByText('SignUp');
  expect(signUp).toBeInTheDocument();
});
