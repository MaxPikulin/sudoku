function holeFinder(wipSudoku) {
  let holes = [];
  wipSudoku.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === 0) holes.push([[y, x],[]]);
    });
  });

  // holes[0][0] = [4,6];
  // holes[0][1] = [1,2,3,4,5,6,7];
  console.log(holes);
}

function uniqueInLines(sudoku, number, posX, posY) {
  for (let x = 0; x < 9; x++) {
    if (x === posX) continue;
    if (sudoku[posY][x] === sudoku[posY][posX]) {
      return false;
    }
  }
  for (let y = 0; y < 9; y++) {
    if (y === posY) continue;
    if (sudoku[y][posX] === sudoku[posY][posX]) {
      return false;
    }
  }
  return true;
}

function uniqueInCube(sudoku, number, posX, posY) {
  const cubeStart = n => Math.floor(n / 3) * 3;
  const startX = cubeStart(posX);
  const startY = cubeStart(posY);

  for (let y = startY; y < startY + 3; y++) {
    for (let x = startX; x < startX + 3; x++) {
      if (sudoku[y][x] === number) {
        return false;
      }
    }
  }
  return true;
}
