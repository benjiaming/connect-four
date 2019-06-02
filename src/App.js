import React, { Component } from "react";
import { Board } from "./Board";
import GameLogic, { stateEnum } from "./GameLogic";
import "./App.css";

const Header = () => {
  return <div className="header">Connect Four</div>;
};
const GameOver = ({ winner }) => {
  const text = winner ? `${winner} wins!` : "Game over!";
  return <div className="game-over">{text}</div>;
};

const NextTurn = ({ who }) => {
  return <div className="next-turn">Next Player: {who}</div>;
};
const RestartGame = ({ onClick }) => {
  return (
    <button className="restart-button" onClick={onClick}>
      Restart game
    </button>
  );
};

class Game extends Component {
  constructor(props) {
    super(props);
    this.WINNING_NUM = 4;
    this.numRows = 6;
    this.numCols = 7;
    this.gameLogic = new GameLogic(this.numRows, this.WINNING_NUM);
    this.state = this.initState();
    this.onClick = this.onClick.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }
  initState() {
    return {
      pieces: this.gameLogic.createPieces(this.numRows, this.numCols),
      isBlacksTurn: true,
      isOver: false,
      winner: ""
    };
  }
  setWinner(winner) {
    this.setState({ winner, isOver: true }, () => {});
  }
  checkWinner(result) {
    if (result !== stateEnum.EMPTY) {
      this.setWinner(result);
      return true;
    }
    return false;
  }
  checkFour() {
    const horizontal = this.gameLogic.checkHorizontal(this.state.pieces);
    if (this.checkWinner(horizontal)) return;
    const vertical = this.gameLogic.checkVertical(this.state.pieces);
    if (this.checkWinner(vertical)) return;
    const diagonal = this.gameLogic.checkDiagonal(this.state.pieces);
    if (this.checkWinner(diagonal)) return;
  }
  onClick(pos) {
    console.log("onclick", this.state);
    if (this.state.isOver) return;
    const color = this.state.isBlacksTurn ? stateEnum.BLACK : stateEnum.RED;
    const pieces = [...this.state.pieces];
    const coords = this.gameLogic.getCoords(pos);
    if (!this.gameLogic.isEmpty(this.state.pieces, coords)) return;
    const avail = this.gameLogic.findAvailablePos(this.state.pieces, coords);
    if (avail === undefined) return;
    pieces[avail[0]][avail[1]] = color;
    this.checkFour();
    this.setState({ pieces, isBlacksTurn: !this.state.isBlacksTurn });
  }
  restartGame() {
    this.setState(this.initState());
  }
  render() {
    const nextTurn = this.state.isBlacksTurn ? "BLACK" : "RED";
    return (
      <div className="game">
        <Header />
        <Board pieces={this.state.pieces} onClick={this.onClick} />
        {this.state.isOver ? (
          <GameOver winner={this.state.winner} />
        ) : (
          <NextTurn who={nextTurn} />
        )}
        <RestartGame onClick={this.restartGame} />
      </div>
    );
  }
}

export default Game;
