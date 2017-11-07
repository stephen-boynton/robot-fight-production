import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import FightView from "./FightView";
import GameOverView from "./GameOverView";
import ScoresView from "./ScoresView";
import HomeView from "./HomeView";
import "../styles/App.css";

class App extends Component {
  state = {
    player: "",
    enterName: true
  };
  _handlePlayerName = playerName => {
    this.setState({
      player: playerName,
      enterName: false
    });
    console.log(this.state.player);
  };
  render() {
    const baseUrl = process.env.PUBLIC_URL;
    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path="/fight"
            component={() => <FightView player={this.state.player} />}
          />
          <Route exact path="/gameover" component={GameOverView} />
          <Route exact path="/topscores" component={ScoresView} />
          <Route
            exact
            path={"/"}
            component={() => (
              <HomeView
                enterName={this.state.enterName}
                player={this._handlePlayerName}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
