function populate9x9() {
  let sudoku = [[],[],[],[],[],[],[],[],[]];
  let squares = [[0,0], [3,0], [6,0],
  [0,3], [3,3], [6,3],
  [0,6], [3,6], [6,6]];
  let unique;
  let random;
  let failCount = 0;

  console.time('total');
  for (let test = 0; test < 1000; test++) {
    // console.time('each');
    for (let currSquare = 0; currSquare < 9; currSquare++) {
      reset: {
        let startX = squares[currSquare][0];
        let startY = squares[currSquare][1];
        for (let y = startY; y < startY + 3; y++) {
          for (let x = startX; x < startX + 3; x++) {
            do {
              random = rnd();
              if (!uniqueInSquare(random, sudoku, startX, startY) || !uniqueInLines(random, sudoku, x, y)) {
                unique = false;
                failCount++;
                if (failCount > 50) {
                  clear3x3(sudoku, startX, startY);
                  failCount = 0;
                  currSquare = currSquare - 2;
                  currSquare = currSquare < -1 ? -1 : currSquare;
                  break reset;
                }
               } else {
                unique = true;
                failCount = 0;
              }
            } while (unique == false);
            sudoku[y][x] = random;
          }
        }
      }
    }
    // console.timeEnd('each');
    // console.table(sudoku);
  }
  console.timeEnd('total');
  return sudoku;
}

function uniqueInSquare(number, sudoku, startX, startY) {
  for (let y = startY; y < startY + 3; y++) {
    for (let x = startX; x < startX + 3; x++) {
      if (sudoku[y][x] === number) {
        return false;
      }
    }
  }
  return true;
}

function uniqueInLines(number, sudoku, posX, posY) {
  for (let x = 0; x < 9; x++) {
    if (sudoku[posY][x] === number || sudoku[x][posX] === number) {
      return false;
    }
  }
  return true;
}

function clear3x3(sudoku, startX, startY) {
  for (let y = startY; y < startY + 3; y++) {
    for (let x = startX; x < startX + 3; x++) {
      sudoku[y][x] = 0;
    }
  }
  return true;
}

function rnd() {
  return Math.floor(Math.random() * 9) + 1;
}
