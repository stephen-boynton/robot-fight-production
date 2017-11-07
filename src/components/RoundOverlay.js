import React from "react";
import "../styles/RoundOverlay.css";

export default function RoundOverlay(props) {
  return (
    <div className="RoundOverlay">
      <h3>A new opponent approaches...</h3>
      {/* <img src={props.image} /> */}
      <h2>ROUND {props.round}</h2>
      <h1>FIGHT!</h1>
    </div>
  );
}
