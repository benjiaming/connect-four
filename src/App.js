import React, { Component } from "react";
import { Board } from "./Board";
import GameLogic, { stateEnum, colorMap } from "./GameLogic";
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
    this.winningNum = 4;
    this.numRows = 6;
    this.numCols = 7;
    this.gameLogic = new GameLogic({
      numRows: this.numRows,
      winningNum: this.winningNum
    });
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
    this.setState({ winner, isOver: true });
  }
  checkWinner(result) {
    if (result !== stateEnum.EMPTY) {
      this.setWinner(result);
      return true;
    }
    return false;
  }
  checkWinningNum() {
    ["checkHorizontal", "checkVertical", "checkDiagonal"].forEach(fun => {
      if (this.checkWinner(this.gameLogic[fun](this.state.pieces))) return;
    });
  }
  onClick(coords) {
    if (this.state.isOver) return;

    const color = this.state.isBlacksTurn ? stateEnum.BLACK : stateEnum.RED;
    const pieces = [...this.state.pieces];
    if (!this.gameLogic.isEmpty(pieces, coords)) return;

    const avail = this.gameLogic.findAvailablePos(pieces, coords);
    if (avail === undefined) return;
    pieces[avail[0]][avail[1]] = color;
    this.checkWinningNum();
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
          <GameOver winner={colorMap[this.state.winner]} />
        ) : (
          <NextTurn who={nextTurn} />
        )}
        <RestartGame onClick={this.restartGame} />
      </div>
    );
  }
}

export default Game;
