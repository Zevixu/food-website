import React from "react";
import { useSelector } from "react-redux";
import Restaurant from './aman_random/Restaraunt';
import "./Home.css";

export default function Home() {
  const loginState = useSelector((state) => state.login);
  if (loginState) {
    return (<Restaurant />);
  }
  return (
    <div className="Home">
      <div className="lander">
        <h1>Welcome to Foodie!</h1>
        <p className="text-muted">Home Page of a simple FOOD app </p>
      </div>
    </div>
  );
}
