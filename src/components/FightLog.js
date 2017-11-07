import React from "react";
import "../styles/FightLog.css";

function FightLog(props) {
  return (
    <div className="FightLog">
      <p>{props.message}</p>
    </div>
  );
}

export default FightLog;
