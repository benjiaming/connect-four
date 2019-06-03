export const stateEnum = {
  EMPTY: 0,
  BLACK: 1,
  RED: 2
};
export const colorMap = ["#ccc", "black", "red"];

export default class GameLogic {
  constructor(args) {
    this.numRows = args.numRows;
    this.winningNum = args.winningNum;
  }
  createPieces(rows, cols) {
    return [...Array(rows)].map(() => [...Array(cols)].fill(stateEnum.EMPTY));
  }
  isEmpty(pieces, coords) {
    return pieces[coords[0]][coords[1]] === stateEnum.EMPTY;
  }
  findAvailablePos(pieces, coords) {
    for (let row = this.numRows - 1; row >= 0; row--) {
      const checkCoords = [row, coords[1]];
      if (this.isEmpty(pieces, checkCoords)) return checkCoords;
    }
    return undefined;
  }
  checkHorizontal(pieces) {
    const checkLine = (row, str) => row.join("").includes(str);
    const black = String(stateEnum.BLACK).repeat(this.winningNum);
    const red = String(stateEnum.RED).repeat(this.winningNum);
    for (let row of pieces) {
      if (checkLine(row, black)) return stateEnum.BLACK;
      if (checkLine(row, red)) return stateEnum.RED;
    }
    return stateEnum.EMPTY;
  }
  checkVertical(pieces) {
    const transposedMatrix = array =>
      array[0].map((_, i) => array.map(row => row[i]));
    return this.checkHorizontal(transposedMatrix(pieces));
  }
  range(num) {
    return [...Array(num).keys()];
  }
  checkDiagonal(pieces) {
    // left -> right
    const rows = [this.range(pieces.length).map(i => pieces[i][i])];
    const rowLength = pieces.length;
    const colLength = pieces[0].length;

    let k = 0;
    while (k < colLength) {
      const row = [];
      let [x, y] = [0, k];
      while (x < rowLength - k && y < colLength) {
        row.push(pieces[x][y + 1]);
        x++;
        y++;
      }
      rows.push(row);
      k++;
    }
    k = 0;
    while (k < rowLength - 1) {
      const row = [];
      let [x, y] = [0, 0];
      while (x < rowLength && y < colLength - k - 2) {
        x++;
        row.push(pieces[x + k][y]);
        y++;
      }
      rows.push(row);
      k++;
    }
    // right -> left
    rows.push(this.range(pieces.length).map(i => pieces[i][pieces.length - i]));
    k = 1;
    while (k < colLength) {
      k++;
      let [x, y] = [0, colLength - k];
      const row = [];
      while (x < rowLength && y >= 0) {
        row.push(pieces[x][y]);
        x++;
        y--;
      }
      rows.push(row);
    }
    rows.push(
      this.range(colLength - 2).map(i => pieces[i + 1][colLength - i - 1])
    );
    rows.push(
      this.range(colLength - 3).map(i => pieces[i + 2][colLength - i - 1])
    );
    return this.checkHorizontal(rows);
  }
}
