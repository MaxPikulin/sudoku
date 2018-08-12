function populate9x9() {
  let squares = [
  [0, 0], [3, 0], [6, 0],
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
  }
  return sudoku;
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

function populateGrid(sudoku = populate9x9(), container = document) {
  let num;
  // const sudoku = populate9x9();
  let cells = Array.from(container.querySelectorAll('.cell'))
      .sort((el1, el2) => el1.dataset.num - el2.dataset.num);
  // console.log(cells);
  for (let y = 0; y < sudoku.length; y++) {
    for (let x = 0; x < sudoku[y].length; x++) {
      let cell = cells[y * sudoku.length + x];
      if (rnd() >= 8) {
        num = 0;
      } else {
        num = sudoku[y][x];
      }
      if (num === 0) {
        zerocellFiller(cell);
      } else {
        cell.textContent = num;
      }
    }
  }
  // console.log(sudoku);
}

function makeGrid() {
 let container = document.querySelector('.container');
 // document.querySelector('.sudoku') ? document.querySelector('.sudoku').remove() : '';

 // let sudoku = populate9x9();
 let cells = '<div class="sudoku">';
 let outerDiv = document.createElement('div');
 //stupidly complex logic to fill page elements with proper sudoku array elements, and numerate it.
 for (let threeRow = 0, n = 0; threeRow < 9; threeRow += 3) {
   for (let cubeCol = 0; cubeCol < 3; cubeCol++) {
     cells += `<div class="cube">`;
     for (let y = 0; y < 3; y++) {
       for (let x = 0; x < 3; x++, n++) {
         let temp = (threeRow + y) * 9 + (cubeCol * 3) + x;
         cells += `<div class="cell nonzero" data-num="${temp}"></div>`;
       }
     }
     cells += `</div>`;
   }
 }
 cells += `</div>`;
 console.log(cells);
 outerDiv.innerHTML = cells;
 return container.appendChild(outerDiv.firstElementChild);
 // populateGrid();
}

function zerocellHandler(div) {
  const cell = div.closest('.cell');
  const number = div.textContent;
  if (cell.classList.contains('hidden')) {
    cell.classList.remove('hidden');
    return;
  }
  cell.innerHTML = number;
  cell.classList.remove('zerocell');
  cell.classList.add('nonzero', 'guessed');
  console.log(cell);
}

function zerocellFiller(div, secondGuess = false) {
  div.innerHTML = '';
  div.classList.remove('nonzero', 'guessed');
  div.classList.add('zerocell', secondGuess?'gg':'hidden');
  let fragment = document.createDocumentFragment();
  let inner = '';
  for (let i = 1; i <= 9; i++) {
    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = `<div class="digit">${i}</div>`;
    fragment.appendChild(tempDiv.firstElementChild);
  }
  div.appendChild(fragment);
  return div;
}

function clearPage() {
  document.querySelector('.sudoku') ? document.querySelectorAll('.sudoku').forEach(sud=>sud.remove()) : '';
}

function newSudBtn() {
  clearPage();
  populateGrid(populate9x9(), makeGrid());
}

function clickHandler(e) {
  console.log(e);
  let target = e.target;
  if (target.classList.contains('digit')) {
    zerocellHandler(target);
  }
  if (target.classList.contains('guessed')) {
    zerocellFiller(target, true);
  }
}

// document.addEventListener('DOMContentLoaded', makeGrid);
document.querySelector('.generate').addEventListener('click', newSudBtn);
document.body.addEventListener('click', clickHandler);
