import React from "react";
import HealthBar from "./HealthBar";
import GameStatus from "./GameStatus";
import "../styles/HealthDisplay.css";

export default function HealthDisplay(props) {
  return (
    <div className="HealthDisplay">
      <HealthBar player={props.player} key={props.player.name} />
      <GameStatus current={props.current} total={props.total} />
      <HealthBar player={props.robot} key={props.robot.name} />
    </div>
  );
}
