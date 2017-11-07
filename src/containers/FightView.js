import React, { Component } from "react";
import HealthDisplay from "../components/HealthDisplay";
import { Redirect } from "react-router-dom";
import Robot from "../components/Robot";
import FightLog from "../components/FightLog";
import RoundOverlay from "../components/RoundOverlay";
import Moves from "../components/Moves";
import robotdata from "../data/robodata";
import {
  punchChanceToHit,
  bigPunchChanceToHit,
  blockChanceToHit,
  enemyTurn
} from "../helpers/fightHelpers";
import {
  oneSecondDelay,
  twoSecondDelay,
  threeSecondDelay,
  customDelay
} from "../helpers/delayHelpers";
import "../styles/FightView.css";

export default class FightView extends Component {
  state = {
    newRound: true,
    player: { hp: 20, maxHp: 20, image: "", name: this.props.player },
    robot: {
      hp: 4,
      maxHp: 4,
      image: robotdata[0].avatar,
      name: robotdata[0].username
    },
    moves: ["Chop", "Boltbuster", "Block"],
    playerTurn: true,
    battleMusic: this._changeMusic(),
    wins: 0,
    currentRound: 1,
    fightLog: `The two opponents are ready for battle!`,
    totalRounds: 10
  };

  ////////////// Handler Functions  //////////////////////
  _fakeFetch = async () => {
    await threeSecondDelay();
    this.setState({
      newRound: false,
      playerTurn: true,
      robot: {
        ...this.state.robot,
        image: robotdata[this.state.wins].avatar,
        name: robotdata[this.state.wins].username
      }
    });
  };

  _handleClick = evt => {
    if (this.state.playerTurn) {
      this._handleMove(evt.target.value);
    }
  };

  componentDidMount() {
    // fake fetch timing
    this._fakeFetch();
  }

  // Round control =================================
  _handleNewRound = () => {
    if (this.state.newRound) {
      return (
        <RoundOverlay
          image={this.state.robot.image}
          round={this.state.currentRound}
        />
      );
    } else {
      return;
    }
  };

  _handleClick = evt => {
    if (this.state.playerTurn) {
      this._handleMove(evt.target.value);
      const playSong = move => {
        const audio = document.getElementById("audio");
        audio.setAttribute("src", `/fx/${move}.mp3`);
        audio.play();
      };
      playSong(evt.target.value);
    }
  };
  _isRobotDefeated = () => {
    return this.state.robot.hp <= 0;
  };

  _handleRoundEnd = async () => {
    await this._defeatRobotAnim();
    this.setState({
      currentRound: this.state.currentRound + 1,
      fightLog: `101010100101010101 - It insults you!`,
      newRound: true,
      playerTurn: false,
      battleMusic: this._changeMusic(),
      robot: {
        ...this.state.robot,
        hp: 4
      },
      gameover: false,
      wins: this.state.wins + 1
    });
    await this._fakeFetch();
  };

  _isPlayerDead = () => {
    return this.player.hp <= 0;
  };

  _handleGameOver = async () => {
    if (this.state.gameover) return <Redirect to="/gameover" />;
  };

  // Health control ==================================
  _damagePlayer = async () => {
    if (this._isRobotDefeated()) {
      console.log("Defeated!");
      this._handleRoundEnd();
    } else {
      const playerHp = this.state.player.hp;
      this.setState({
        fightLog: `${this.state.robot.name} struck ${this.state.player
          .name} with BinaryAttack!`,
        player: {
          ...this.state.player,
          hp: playerHp - 1
        }
      });
      await this._struckPlayerAnim();
      if (this._isPlayerDead) {
        this.setState({
          gameover: true
        });
      }
    }
  };

  _critPlayer = async () => {
    if (this._isRobotDefeated()) {
      console.log("Defeated!");
      this._handleRoundEnd();
    } else {
      const playerHp = this.state.player.hp;
      this.setState({
        fightLog: `${this.state.robot.name} struck ${this.state.player
          .name} with ${robotdata[this.state.wins].skills[0]}!`,
        player: {
          ...this.state.player,
          hp: playerHp - 2
        }
      });
      await this._struckPlayerAnim();
      if (this._isPlayerDead) {
        this.setState({ gameover: true });
      }
    }
  };

  _damageRobot = async () => {
    const roboHp = this.state.robot.hp;
    this.setState({
      fightLog: `${this.state.player.name} struck ${this.state.robot
        .name} with a karate chop!`,
      robot: {
        ...this.state.robot,
        hp: roboHp - 1
      },
      playerTurn: false
    });
    await this._struckRobotAnim();
  };

  _critRobot = async () => {
    const roboHp = this.state.robot.hp;
    this.setState({
      fightLog: `${this.state.player.name} struck ${this.state.robot
        .name} with BoltBreaker!`,
      robot: {
        ...this.state.robot,
        hp: roboHp - 2
      },
      playerTurn: false
    });
    await this._devestateRobotAnim();
  };

  // Game action control ===========================

  _enemyTurn = async () => {
    console.log("Enemy turn!");
    this.setState({ playerTurn: false });
    await customDelay(3);
    let enemyMove = enemyTurn();
    this._handleMove(enemyMove);
    this.setState({ playerTurn: true });
  };

  _handleMove = moveName => {
    if (this.state.playerTurn) {
      //Player turn----------------------
      switch (moveName) {
        case "Chop":
          if (punchChanceToHit()) {
            this._damageRobot();
            this._enemyTurn();
            break;
          } else {
            this.setState({
              fightLog: `${this.state.player
                .name} tries to do something resembling karate...`
            });
            this._enemyTurn();
            break;
          }
        case "Boltbuster":
          if (bigPunchChanceToHit()) {
            this._critRobot();
            this._enemyTurn();
            break;
          } else {
            this.setState({
              fightLog: `${this.state.player.name} attacks... the air!`
            });
            this._enemyTurn();
            break;
          }
        case "Block":
          if (blockChanceToHit()) {
            this._damageRobot();
            this._enemyTurn();
            break;
          } else {
            this.setState({
              fightLog: `${this.state.player.name} attacks... the air!`
            });
            this._enemyTurn();
            break;
          }
      }
    } else if (!this.state.playerTurn) {
      console.log("Enemy Move = ", moveName);
      //Robot turn --------------------
      switch (moveName) {
        case "Chop":
          if (punchChanceToHit()) {
            this._damagePlayer();
            break;
          } else {
            if (this._isRobotDefeated()) {
              this._handleRoundEnd();
              break;
            } else {
              this.setState({
                fightLog: `${this.state.robot
                  .name} computes the efficiency of sliced bread...`
              });
              break;
            }
          }
        case "Boltbuster":
          if (bigPunchChanceToHit()) {
            this._critPlayer();
            break;
          } else {
            if (this._isRobotDefeated()) {
              this._handleRoundEnd();
              break;
            } else {
              this.setState({
                fightLog: `${this.state.robot.name} stands still menancingly...`
              });
              break;
            }
          }
        case "Block":
          if (blockChanceToHit()) {
            this._damagePlayer();
            break;
          } else {
            if (this._isRobotDefeated()) {
              this._handleRoundEnd();
            }
            break;
          }
      }
    }
  };
  // Sound control ====================================
  _changeMusic() {
    const num = Math.floor(Math.random() * 3);
    const arrayOfMusic = [
      "/fx/battle1.mp3",
      "/fx/battle2.mp3",
      "/fx/battle3.mp3"
    ];
    console.log(arrayOfMusic[num]);
    return arrayOfMusic[num];
  }
  // Animations =======================================
  _struckPlayerAnim = async () => {
    console.log("Struck!");
    const screen = document.querySelector(".FightView");
    const sound = document.getElementById("soundFX");
    sound.setAttribute("src", "/fx/chop.mp3");
    sound.play();
    screen.classList.toggle("struck");
    await customDelay(2);
    screen.classList.toggle("struck");
  };

  _struckRobotAnim = async () => {
    const robo = document.querySelector(".Robot");
    robo.classList.toggle("struckRobo");
    await customDelay(2);
    robo.classList.toggle("struckRobo");
  };

  _devestateRobotAnim = async () => {
    const robo = document.querySelector(".Robot");
    robo.classList.toggle("devestateRobo");
    await customDelay(2);
    robo.classList.toggle("devestateRobo");
  };

  _defeatRobotAnim = async () => {
    const robo = document.querySelector(".Robot");
    robo.classList.toggle("death");
    await customDelay(2);
    robo.classList.toggle("death");
  };

  // Render method ====================================
  render() {
    return (
      <div>
        <audio id="audio" src={this.state.moveAudio} autostart="true" />
        <audio id="soundFX" src="/fx/chop.mp3" autostart="true" />
        <div className="FightView">
          <audio id="music" src={this.state.battleMusic} autoPlay />
          {this._handleNewRound()}
          <HealthDisplay
            player={this.state.player}
            robot={this.state.robot}
            current={this.state.currentRound}
            total={this.state.totalRounds}
          />
          <Robot robot={this.state.robot} />
          <FightLog message={this.state.fightLog} />
          <Moves moves={this.state.moves} handleClick={this._handleClick} />
        </div>
      </div>
    );
  }
}
