import React, { Component } from "react";
import { colorMap } from "./GameLogic";

class Piece extends Component {
  render() {
    const { pos, color } = this.props;
    const style = {
      background: colorMap[color],
      transition: "background 250ms ease-in-out, transform 150ms ease"
    };
    return (
      <td>
        <button
          style={style}
          className="board-button"
          onClick={() => this.props.onClick(pos)}
        />
      </td>
    );
  }
}
export class Board extends Component {
  render() {
    const buttons = this.props.pieces.map((row, i) => (
      <tr key={i}>
        {row.map((col, j) => (
          <Piece
            key={j}
            pos={[i, j]}
            onClick={this.props.onClick}
            color={col}
          />
        ))}
      </tr>
    ));
    return (
      <table className="board-table">
        <tbody>{buttons}</tbody>
      </table>
    );
  }
}
