import React, { Component } from "react";
import "./App.css";

const GameOver = ({ winner }) => {
  return (
    <div className="game-over">
      {winner} wins!
      <div />
    </div>
  );
};

const stateEnum = {
  EMPTY: "#bbb",
  RED: "red",
  BLACK: "black"
};

class Piece extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.onClick(this.props.pos);
  }
  render() {
    const { pos, color } = this.props;
    const style = {
      background: color
    };
    return (
      <td key={pos}>
        <button
          style={style}
          className="board-button"
          onClick={this.handleClick}
          data={pos}
        />
      </td>
    );
  }
}
class Board extends Component {
  render() {
    const buttons = this.props.pieces.map((row, i) => (
      <tr key={i}>
        {row.map((col, j) => (
          <Piece
            key={j}
            pos={`${i}:${j}`}
            onClick={this.props.onClick}
            color={col}
          />
        ))}
      </tr>
    ));
    return (
      <table>
        <tbody>{buttons}</tbody>
      </table>
    );
  }
}

class Game extends Component {
  constructor(props) {
    super(props);
    this.numRows = 6;
    this.numCols = 7;
    this.WINNING_NUM = 4;
    this.state = {
      pieces: this.createPieces(this.numRows, this.numCols),
      paused: false,
      isBlacksTurn: true,
      isOver: false,
      winner: ""
    };
    this.onClick = this.onClick.bind(this);
  }
  createPieces(rows, cols) {
    return [...Array(rows)].map(() => [...Array(cols)].fill(stateEnum.EMPTY));
  }

  getCoords(pos) {
    return pos.split(":").map(i => parseInt(i));
  }
  isEmpty(coords) {
    return this.state.pieces[coords[0]][coords[1]] === stateEnum.EMPTY;
  }
  isRed(coords) {
    return this.state.pieces[coords[0]][coords[1]] === stateEnum.RED;
  }
  isBlack(coords) {
    return this.state.pieces[coords[0]][coords[1]] === stateEnum.BLACK;
  }
  findAvailablePos(coords) {
    for (let row = this.numRows - 1; row >= 0; row--) {
      const checkCoords = [row, coords[1]];
      if (this.isEmpty(checkCoords)) return checkCoords;
    }
    return undefined;
  }
  checkHorizontal(pieces) {
    const black = stateEnum.BLACK.repeat(this.WINNING_NUM);
    const red = stateEnum.RED.repeat(this.WINNING_NUM);
    const checkLine = (row, str) => row.join("").includes(str);
    for (let row of pieces) {
      if (checkLine(row, black)) return stateEnum.BLACK;
      if (checkLine(row, red)) return stateEnum.RED;
    }
    return stateEnum.EMPTY;
  }
  checkVertical(pieces) {
    const transposedMatrix = array =>
      array[0].map((col, i) => array.map(row => row[i]));
    return this.checkHorizontal(transposedMatrix(pieces));
  }
  checkDiagonal() {
    return stateEnum.EMPTY;
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
  hasFour() {
    const horizontal = this.checkHorizontal(this.state.pieces);
    if (this.checkWinner(horizontal)) return;
    const vertical = this.checkVertical(this.state.pieces);
    if (this.checkWinner(vertical)) return;
    const diagonal = this.checkDiagonal();
    if (this.checkWinner(diagonal)) return;
  }
  onClick(pos) {
    const color = this.state.isBlacksTurn ? stateEnum.BLACK : stateEnum.RED;
    const pieces = [...this.state.pieces];
    const coords = this.getCoords(pos);
    if (!this.isEmpty(coords)) return;
    const avail = this.findAvailablePos(coords);
    if (avail === undefined) return;
    pieces[avail[0]][avail[1]] = color;
    this.hasFour();
    this.setState({ pieces, isBlacksTurn: !this.state.isBlacksTurn });
  }
  render() {
    if (this.state.isOver) {
      return <GameOver winner={this.state.winner} />;
    }
    return (
      <div className="game">
        <Board pieces={this.state.pieces} onClick={this.onClick} />
      </div>
    );
  }
}

export default Game;
