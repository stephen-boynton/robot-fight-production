import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/HomeView.css";
import {
  oneSecondDelay,
  twoSecondDelay,
  threeSecondDelay,
  customeDelay
} from "../helpers/delayHelpers";

export default class HomeView extends Component {
  state = {
    titleMusic: "/fx/title.mp3",
    faded: false
  };

  _getPlayerName = event => {
    event.preventDefault();
    this.setState({ enterName: false });
    this.props.player(event.target[0].value);
  };
  
  _handleStartGame = () => {
    if (this.props.enterName) {
      return (
        <form className="form op-1" onSubmit={this._getPlayerName}>
          <label className="username-label">
            What is your name, oh great deleter?
          </label>
          <input
            autoComplete="off"
            type="username"
            className="username"
            id="username"
            required
          />
          <button type="submit" className="form-button" id="button">
            Submit
          </button>
        </form>
      );
    } else {
      return (
        <form className="form" onSubmit={this._getPlayerName}>
          <button type="button" className="form-button" id="button">
            <Link className="start" to="/fight">
              {" "}
              START{" "}
            </Link>
          </button>
        </form>
      );
    }
  };

  fadeInDivs = async () => {
    await oneSecondDelay();
    document.querySelector(".homeTitle").classList.remove("op-0");
    document.querySelector(".homeTitle").classList.add("op-1");
    await oneSecondDelay();
    document.querySelector(".form").classList.remove("op-0");
    document.querySelector(".form").classList.add("op-1");
    await oneSecondDelay();
    document.querySelector(".instructions-container").classList.remove("op-0");
    document.querySelector(".instructions-container").classList.add("op-1");
  };

  componentDidMount() {
    console.log("Faded: ", this.state.faded);
    // if(this.state.faded === false){
    //   this.fadeInDivs();
    //   this.setState({
    //     faded: true
    //   })
    // }
  }

  render() {
    return (
      <div className="HomeView">
        <div className="homeTitle op-1">
          <h1>ROBO-FIGHT 4</h1>
          <h3>Redo This</h3>
        </div>
        {this._handleStartGame()}
        <div className="instructions-container op-1">
          <p className="instTitle">Instructions</p>
          <p>
            Get your retribution on those darned, dirty robots that have brought
            you pain and suffering. Use your sick moves to smash them to bits,
            and delete them from the very databases they've plagued for 3 eons.
          </p>
        </div>
      </div>
    );
  }
}
