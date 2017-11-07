import React, { Component } from "react";
import "../styles/Moves.css";

class Moves extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    console.log(this.props);
    let moves = this.props.moves;

    return (
      <div className="Moves">
        {moves.map(move => {
          return (
            <button
              value={move}
              key={move}
              onClick={this.props.handleClick}
              className="moveBtn"
            >
              {move}
            </button>
          );
        })}
      </div>
    );
  }
}

export default Moves;
