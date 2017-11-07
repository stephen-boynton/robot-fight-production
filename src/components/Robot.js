import React from "react";
import "../styles/Robot.css";

export default function Robot(props) {
  return (
    <div className="Robot">
      <img src={props.robot.image} />
      <h3>{props.robot.name}</h3>
    </div>
  );
}
