import React from "react";
import "../styles/HealthBar.css";

export default function HealthBar(props) {
  return (
    <div className="HealthBar">
      <progress value={props.player.hp} max={props.player.maxHp} />
      <h3>{props.player.name}</h3>
    </div>
  );
}
