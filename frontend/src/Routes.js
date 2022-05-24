import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import SignUp from './containers/sign-up/index'
import Cartpage from "./containers/myCart";
import Checkout from "./containers/checkout";
import Checkout_info from "./containers/checkout_info";

export default function CustomRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route exact path="/myCart" element={<Cartpage />} />
      <Route exact path="/checkout" element={<Checkout />} />
      <Route exact path="/checkoutinfo" element={<Checkout_info />} />
    </Routes>
  );
}
