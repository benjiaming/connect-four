import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import GameLogic, { stateEnum } from "./GameLogic";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("should provide game logic", () => {
  let gameLogic = new GameLogic({ winningNum: 3, numRows: 3 });
  let matrix = gameLogic.createPieces(3, 3);
  expect(matrix).toEqual([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
  expect(
    gameLogic
      .range(2)
      .map(i => [i, i])
      .every(c => gameLogic.isEmpty(matrix, c))
  );
  expect(gameLogic.findAvailablePos(matrix, [0, 0])).toEqual([2, 0]);
  expect(gameLogic.findAvailablePos(matrix, [2, 0])).toEqual([2, 0]);
  expect(gameLogic.checkHorizontal(matrix)).toEqual(stateEnum.EMPTY);

  matrix[0] = [stateEnum.RED, stateEnum.RED, stateEnum.RED];
  expect(gameLogic.checkHorizontal(matrix)).toEqual(stateEnum.RED);
  matrix[0] = [stateEnum.RED, stateEnum.RED, stateEnum.BLACK];
  expect(gameLogic.checkHorizontal(matrix)).toEqual(stateEnum.EMPTY);

  matrix = [[2, 0, 0], [2, 0, 0], [2, 0, 0]];
  expect(gameLogic.checkVertical(matrix)).toEqual(stateEnum.RED);
  matrix[0][0] = 1;
  expect(gameLogic.checkVertical(matrix)).toEqual(stateEnum.EMPTY);
  matrix = [[2, 0, 0], [1, 2, 0], [1, 0, 2]];
  expect(gameLogic.checkDiagonal(matrix)).toEqual(stateEnum.RED);
});

it("should check diagonals", () => {
  const gameLogic = new GameLogic({ winningNum: 4, numRows: 6 });
  const matrix = gameLogic.createPieces(6, 7);
  expect(matrix).toEqual([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ]);
  matrix[2][6] = stateEnum.BLACK;
  matrix[3][5] = stateEnum.BLACK;
  matrix[4][4] = stateEnum.BLACK;
  matrix[5][3] = stateEnum.BLACK;
  expect(matrix).toEqual([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0]
  ]);
  expect(gameLogic.checkDiagonal(matrix)).toEqual(stateEnum.BLACK);
});
