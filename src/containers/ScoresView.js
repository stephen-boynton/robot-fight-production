import React, { Component } from "react";
import ScoreBoard from "../components/ScoreBoard";
import "../styles/ScoresView.css";

export default class ScoreView extends Component {
  render() {
    return (
      <div className="ScoreView">
        <h2>HIGH SCORES</h2>
        <ScoreBoard />
      </div>
    );
  }
}
