function populate9x9() {
  let squares = [[0, 0], [3, 0], [6, 0],
  [0, 3], [3, 3], [6, 3],
  [0, 6], [3, 6], [6, 6]];
  let unique;
  let random;
  let counter;
  let sudoku;

  sudoku = [[], [], [], [], [], [], [], [], []];
  for (let currSquare = 0; currSquare < 9; currSquare++) {
    reset: {
      let startX = squares[currSquare][0];
      let startY = squares[currSquare][1];
      clear3x3(sudoku, startX, startY);
      let set = [1, 2, 3, 4, 5, 6, 7, 8, 9].shuffle();
      for (let y = startY; y < startY + 3; y++) {
        for (let x = startX; x < startX + 3; x++) {
          counter = set.length - 1;
          do {
            sudoku[y][x] = set[counter];
            unique = false;
            if (uniqueInLines(sudoku, x, y)) {
              unique = true;
              set.splice(counter, 1);
              break;
            } else {
              counter--;
            }
            if (counter < 0) {
              set = [1, 2, 3, 4, 5, 6, 7, 8, 9].shuffle();
              counter = set.length - 1;
              x = startX;
              y = startY - 1;
              clear3x3(sudoku, startX, startY);
              currSquare = currSquare > 0 ? currSquare - 2 : -1;
              break reset;
            }
          } while (unique === false);
        }
      }
    }
    return sudoku;
  }
}

function uniqueInLines(sudoku, posX, posY) {
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

function clear3x3(sudoku, startX, startY) {
  for (let y = startY; y < startY + 3; y++) {
    for (let x = startX; x < startX + 3; x++) {
      sudoku[y][x] = 0;
    }
  }
  return true;
}

function rnd(to = 9, from = 1) {
  return Math.floor(Math.random() * to) + from;
}

function test(func, times = 1) {
  console.time('main');
  for (let i = 0; i < times; i++) {
    func();
  }
  console.timeEnd('main');
  console.log(times + ' times.');
}

Array.prototype.shuffle = function() {
  let input = this;
  for (let currIndex = input.length - 1; currIndex >= 0; currIndex--) {
    let random = rnd(input.length - 1, 0);
    let value = input[currIndex];
    input[currIndex] = input[random];
    input[random] = value;
  }
  return input;
}
