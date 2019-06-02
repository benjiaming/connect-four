import React, { Component } from "react";

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
export class Board extends Component {
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
      <table className="board-table">
        <tbody>{buttons}</tbody>
      </table>
    );
  }
}
