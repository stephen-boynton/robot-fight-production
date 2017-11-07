import React, { Component } from 'react';


export default class GameOverView extends Component {
  render(){
    return(
      <div className="gameOver">
        <img className="gameOverImg" href="%PUBLIC_URL%/gameover.jpg" alt="Game Over"/>
      </div>
    )
  }
}
