import * as React from "react";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";
import CustomRoutes from "./Routes";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { useSelector, useDispatch } from 'react-redux';
import { LOGOUT, SHOW_ALART, DISMISS_ALART } from './redux/actionTypes';
import { Alert } from "react-bootstrap";
import { logoutAPI } from './client/user';
import { useNavigate } from 'react-router-dom';

function App() {
  const loginState = useSelector((state) => state.login);
  const { show, variant, message } = useSelector((state) => state.alart);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const logOut = () => {
    logoutAPI().then((res) => {
      if (res.data.success) {
        dispatch({ type: LOGOUT });
        dispatch({ type: SHOW_ALART, payload: { message: res.data.msg, variant: 'success' } });
        localStorage.clear();
        nav('/');
      }
      else {
        dispatch({ type: SHOW_ALART, payload: { message: res.data.msg, variant: 'danger' } });
      }
    })
  };

  return (
    <div className="App container py-3">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
        <Container>
          <Navbar.Brand href="/" className="font-weight-bold text-muted">
            Foodie
          </Navbar.Brand>
        </Container>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {!loginState &&
            <Nav activeKey={window.location.pathname}>
              <Nav.Link href="/signup">SignUp</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
          }
          {loginState &&
            <Nav activeKey={window.location.pathname}>
              <Nav.Link href="/myCart">MyCart</Nav.Link>
              <Nav.Link onClick={logOut}>LogOut</Nav.Link>
            </Nav>
          }
        </Navbar.Collapse>
      </Navbar>
      <Alert variant={variant} show={show} dismissible onClose={() => dispatch({ type: DISMISS_ALART })}>
        {message}
      </Alert>
      <CustomRoutes />

    </div>
  );
}

export default App;
