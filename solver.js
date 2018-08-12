let variants = 0;
let inside = 0;
let outside = 0;
let deepest = 0;

function solver(wipSudoku) {
  variants = 0;
  inside = 0;
  outside = 0;
  deepest = 0;
  clearPage();
  holeFinder(wipSudoku);
  console.log(`inside: ${inside}. outside: ${outside}. deepest: ${deepest}`);
}

function holeFinder(wipSudoku) {
  // variants = 0;
  let holes = [];
  wipSudoku.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === 0) holes.push([[x, y]]);
    });
  });

  holes.forEach((hole, i) => {
    holes[i].push(checkPossibleNumbers(wipSudoku, hole[0][0], hole[0][1]));
  });
  // holes[0][0] = [4,6];
  // holes[0][1] = [1,2,3,4,5,6,7];
  holes.sort((el1, el2) => {
    // console.log(el1[1].length, el2[1].length);
    return el1[1].length - el2[1].length;
  });

  // console.log(holes);
  // if (holes.length === 0) return wipSudoku;

  if (holes.length < 1) {
    // console.log(JSON.stringify(wipSudoku));
    variants++;
    populateGrid(wipSudoku, makeGrid());
    return true;
  }
  // try {
  //   posNums = holes[0][1];
  // } catch(e) {
  //   console.log(holes.length);
  //   console.log(wipSudoku);
  //   // return;
  // }
  let posNums = holes[0][1];
  let coord = holes[0][0];

  inside++;
  // console.log(`vars: ${posNums}. y: ${coord[1]} x: ${coord[0]}`);
  // console.log(JSON.stringify(wipSudoku));
  if (posNums.length > 0) {

    if (posNums.length > 1) {
      deepest++;
    }
    posNums.forEach(guess => {
      // console.log(variants);
      if (variants > 1) {
        console.log(`Sudoku non-unique: ${variants}`);
        return false;
      }
      wipSudoku[coord[1]][coord[0]] = guess;//holes[0][1].shift(); //holes[0][1][0];
      holeFinder(wipSudoku);
      wipSudoku[coord[1]][coord[0]] = 0;

      outside++;
      // console.log(holes);
    });
    // for (let v = 0; v < holes[0][1].length; v++){
    // }
    // console.log(wipSudoku[holes[0][0][1], holes[0][0][0]]);
    // console.log(JSON.stringify(wipSudoku));
  }
  return false;
  // console.table(wipSudoku);
}

function checkPossibleNumbers(sudoku, posX, posY) {
  let possibleNumbers;
  let possibleInCube = [];
  let possibleInLines = [];
  for (let i = 1; i <= 9; i++) {
    if (uniqueInCube(sudoku, i, posX, posY)) {
      possibleInCube.push(i);
    } if (uniqueInLinez(sudoku, i, posX, posY)) {
      possibleInLines.push(i);
    }
  }
  // possibleNumbers = possibleInCube.slice(0);
  possibleNumbers = possibleInCube.filter(number => possibleInLines.includes(number));
  return possibleNumbers;
}

function uniqueInLinez(sudoku, number, posX, posY) {
  for (let x = 0; x < sudoku[0].length; x++) {
    if (x === posX) continue;
    if (sudoku[posY][x] === number) {
      return false;
    }
  }
  for (let y = 0; y < sudoku.length; y++) {
    if (y === posY) continue;
    if (sudoku[y][posX] === number) {
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









/*
[
[7, 9, 0, 0, 0, 0, 0, 0, 3],
[0, 0, 0, 0, 0, 0, 0, 6, 0],
[8, 0, 1, 0, 0, 4, 0, 0, 2],
[0, 0, 5, 0, 0, 0, 0, 0, 0],
[3, 0, 0, 1, 0, 0, 0, 0, 0],
[0, 4, 0, 0, 0, 6, 2, 0, 9],
[2, 0, 0, 0, 3, 0, 0, 0, 6],
[0, 3, 0, 6, 0, 5, 4, 2, 1],
[0, 0, 0, 0, 0, 0, 0, 0, 0]]


[
[4, 6, 0, 0, 3, 0, 0, 0, 2],
[9, 5, 0, 0, 8, 4, 6, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 5, 0],
[0, 0, 0, 4, 0, 2, 0, 6, 0],
[8, 7, 0, 0, 6, 0, 0, 2, 4],
[0, 4, 0, 8, 0, 5, 0, 0, 0],
[0, 9, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 7, 1, 4, 0, 0, 3, 9],
[3, 0, 0, 0, 5, 0, 0, 8, 6]]


[
[0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0],
[0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0],
[0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0],
[0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0],
[0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0],
[0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0],
[0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0],
[0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0],
[0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0],
[0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0],
[0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0],
[0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0],
[0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0],
[0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0],
[0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0],
[0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0]]














*/
