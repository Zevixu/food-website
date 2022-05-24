import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import { loginAPI } from "../client/user";
import { useNavigate } from 'react-router-dom';
import { LOGIN, SHOW_ALART } from "../redux/actionTypes";
import { useDispatch } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }
  const nav = useNavigate();

  const afterLogin = (res) => {
    if (res.data.success) {
      dispatch({ type: SHOW_ALART, payload: { message: res.data.msg, variant: 'success' } });
      dispatch({ type: LOGIN });
      nav('/');
    }
    else {
      dispatch({ type: SHOW_ALART, payload: { message: res.data.msg, variant: 'danger' } });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const loginParams = {
      email: email,
      password: password,
    };
    loginAPI(loginParams).then(afterLogin);
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}