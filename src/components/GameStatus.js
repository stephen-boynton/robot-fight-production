import React from "react";
import "../styles/GameStatus.css";

export default function GameStatus(props) {
  return (
    <div className="GameStatus">
      <p>
        Round: {props.current}/{props.total}
      </p>
    </div>
  );
}
