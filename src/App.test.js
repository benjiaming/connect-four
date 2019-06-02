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
  let gameLogic = new GameLogic(3, 3);
  let matrix = gameLogic.createPieces(3, 3);
  expect(matrix).toEqual([
    ["#bbb", "#bbb", "#bbb"],
    ["#bbb", "#bbb", "#bbb"],
    ["#bbb", "#bbb", "#bbb"]
  ]);
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

  matrix = [
    ["red", "#bbb", "#bbb"],
    ["red", "#bbb", "#bbb"],
    ["red", "#bbb", "#bbb"]
  ];
  expect(gameLogic.checkVertical(matrix)).toEqual(stateEnum.RED);
  matrix[0][0] = "black";
  expect(gameLogic.checkVertical(matrix)).toEqual(stateEnum.EMPTY);
  matrix = [
    ["red", "#bbb", "#bbb"],
    ["black", "red", "#bbb"],
    ["black", "#bbb", "red"]
  ];
  expect(gameLogic.checkDiagonal(matrix)).toEqual(stateEnum.RED);

  matrix = gameLogic.createPieces(6, 7);
  expect(matrix).toEqual([
    ["#bbb", "#bbb", "#bbb", "#bbb", "#bbb", "#bbb", "#bbb"],
    ["#bbb", "#bbb", "#bbb", "#bbb", "#bbb", "#bbb", "#bbb"],
    ["#bbb", "#bbb", "#bbb", "#bbb", "#bbb", "#bbb", "#bbb"],
    ["#bbb", "#bbb", "#bbb", "#bbb", "#bbb", "#bbb", "#bbb"],
    ["#bbb", "#bbb", "#bbb", "#bbb", "#bbb", "#bbb", "#bbb"],
    ["#bbb", "#bbb", "#bbb", "#bbb", "#bbb", "#bbb", "#bbb"]
  ]);
  matrix[2][6] = stateEnum.BLACK;
  matrix[3][5] = stateEnum.BLACK;
  matrix[4][4] = stateEnum.BLACK;
  matrix[5][3] = stateEnum.BLACK;
  expect(matrix).toEqual([
    ["#bbb", "#bbb", "#bbb", "#bbb", "#bbb", "#bbb", "#bbb"],
    ["#bbb", "#bbb", "#bbb", "#bbb", "#bbb", "#bbb", "#bbb"],
    ["#bbb", "#bbb", "#bbb", "#bbb", "#bbb", "#bbb", "black"],
    ["#bbb", "#bbb", "#bbb", "#bbb", "#bbb", "black", "#bbb"],
    ["#bbb", "#bbb", "#bbb", "#bbb", "black", "#bbb", "#bbb"],
    ["#bbb", "#bbb", "#bbb", "black", "#bbb", "#bbb", "#bbb"]
  ]);
  expect(gameLogic.checkDiagonal(matrix)).toEqual(stateEnum.BLACK);
});
