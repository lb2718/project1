const gridElement = document.querySelector(".grid");
const buttonElement = document.querySelector("button");
const scoreDisplay = document.querySelector("#itemsCaught");
// Accessing img (right div) for it to change depending on LIfe Bar level
const imgElement = document.querySelector(".defaultPic");
const totalItems = document.querySelector("#itemsTotal");

// Cells
const gridWidth = 8;
const gridHeight = 8;
const cells = [];

let score = 0;
let nbItems = 0;
let caughtItems = 0;

// which CELL INDEX is the character at
// faire row et column comme enemy?
const initialPosition = 0;
let currentPosition = initialPosition;

// which CELL INDEX is the enemy at
const enemyInitialPosition = gridWidth * gridHeight - 1;
let enemyCurrentPosition = enemyInitialPosition;
// let enemyPosition = { row: 0, column: 0 };

// Populate the grid
for (let i = 0; i < gridHeight; i++) {
  for (let j = 0; j < gridWidth; j++) {
    const cell = createCell();
    cell.dataset.row = i;
    cell.dataset.column = j;
    gridElement.appendChild(cell);
    // save the cell for later!
    cells.push(cell);
  }
}

function createCell() {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  return cell;
}

function showPlayer(classToAdd) {
  // Show the player in the currentPosition
  cells[currentPosition].classList.add("playerImg");
  if (classToAdd) {
    cells[currentPosition].classList.add(classToAdd);
  }
}

function showEnemy(classToAdd) {
  // Show the player in the currentPosition
  cells[enemyCurrentPosition].classList.add("enemyImg");
  // Florian's solution, not finished
  // const enemyCell = document.querySelector(`[]`);
  if (classToAdd) {
    cells[enemyCurrentPosition].classList.add(classToAdd);
  }
}

function showItems(position) {
  cells[position].classList.add("items");
}

function showDoor(position) {
  if (+scoreDisplay.textContent === +totalItems.textContent) {
    placeDoorRandomly();
    cells[position].classList.add("door");
  }
}

// add "remove" items après qu'ils soient caught
function catchItem(position) {
  cells[position].classList.add("caught");
}

// To change cell
function removePlayer() {
  // Stop showing the player in the currentPosition
  cells[currentPosition].classList.remove("playerImg", "left");
}

//To change cell
function removeEnemy() {
  // Stop showing the enemy in the currentPosition
  cells[enemyCurrentPosition].classList.remove("enemyImg", "left");
}

// To be called when all items are caught
function openDoor() {
  const newDoor = Math.floor(Math.random() * gridHeight * gridWidth);
}

function catchItem() {
  if (cells[currentPosition].classList.contains("items")) {
    caughtItems++;
    scoreDisplay.textContent = caughtItems;
    cells[currentPosition].classList.remove("items");
  }
  if (caughtItems >= +totalItems.textContent) {
    openDoor();
  }
}

function movePlayer(newPosition, classToAdd) {
  if (newPosition < 0) {
    return;
  }
  if (newPosition > gridWidth * gridHeight - 1) {
    return;
  }
  catchItem(currentPosition);

  removePlayer();
  currentPosition = newPosition;

  //   if (isUneatenMarmalade(newPosition)) {
  //     score += 50;
  //     console.log("SCORE", score);
  //     eatMarmalade(newPosition);
  //     eatenMarmalades++;
  //     console.log("eatenMarmalades", eatenMarmalades);
  //   }

  //   if (eatenMarmalades === nbMarmelade) {
  //     clearInterval(intervalID);
  //     console.log("NO MORE MARMELADE : GAME OVER");
  //     console.log("YOU SCORE ", score);
  //   }

  // Always show last
  showPlayer(classToAdd);
}

function moveEnemy(newPosition, classToAdd) {
  if (newPosition < 0) {
    return;
  }
  if (newPosition > gridWidth * gridHeight - 1) {
    return;
  }

  removeEnemy();
  enemyCurrentPosition = newPosition;

  // Always show last
  showEnemy(classToAdd);
}

function decideMoveEnemy() {
  const randMove = Math.floor(Math.random() * 4);
  // console.log("randmove", randMove);
  // console.log(cells[enemyCurrentPosition - gridWidth]);
  switch (randMove) {
    // Enemy goes up
    case 0:
      if (
        enemyCurrentPosition < gridWidth ||
        cells[enemyCurrentPosition - gridWidth].classList.contains("items")
      ) {
        decideMoveEnemy();
        break;
      }
      moveEnemy(enemyCurrentPosition - gridWidth);
      break;
    // Enemy goes down
    case 1:
      if (
        enemyCurrentPosition >= gridWidth * gridHeight - gridWidth ||
        cells[enemyCurrentPosition + gridWidth].classList.contains("items")
      ) {
        decideMoveEnemy();
        break;
      }
      moveEnemy(enemyCurrentPosition + gridWidth);
      break;
    // Enemy goes left
    case 2:
      if (
        enemyCurrentPosition % gridWidth === 0 ||
        cells[enemyCurrentPosition - 1].classList.contains("items")
      ) {
        decideMoveEnemy();
        break;
      }
      moveEnemy(enemyCurrentPosition - 1);
      break;
    // Enemy goes right
    case 3:
      if (
        enemyCurrentPosition % gridWidth === gridWidth - 1 ||
        cells[enemyCurrentPosition + 1].classList.contains("items")
      ) {
        break;
      }
      moveEnemy(enemyCurrentPosition + 1);
      break;
  }
}

function getEnemyPosition() {
  let enemy = document.querySelector(".enemyImg");
}

// function isItemCaught(position) {
//   const isItem = cells[position].classList.contains("item");
//   const isCaught = cells[position].classList.contains("caught");
//   return isItem && !isCaught;
// }

// show initial position
showPlayer();

intervalID = setInterval(decideMoveEnemy, 300);

document.addEventListener("keydown", function (event) {
  console.log(event.key, event.key, event.code);

  switch (event.key) {
    case "ArrowUp":
      movePlayer(currentPosition - gridWidth);
      break;
    case "ArrowDown":
      movePlayer(currentPosition + gridWidth);
      break;
    case "ArrowLeft":
      if (currentPosition % gridWidth === 0) {
        break;
      }
      movePlayer(currentPosition - 1, "left");
      break;
    case "ArrowRight":
      if (currentPosition % gridWidth === gridWidth - 1) {
        break;
      }
      movePlayer(currentPosition + 1);
      break;
  }
});

// Position DOOR randomly
function placeDoorRandomly() {
  const randomDoorPosition = Math.floor(Math.random() * cells.length);
  if (currentPosition === randomDoorPosition) {
    placeDoorRandomly();
    return;
  }
  showDoor(randomDoorPosition);
}

// Position items randomly
function placeItemsRandomly() {
  const randomPosition = Math.floor(Math.random() * cells.length);
  if (
    randomPosition === initialPosition ||
    randomPosition === enemyInitialPosition ||
    cells[randomPosition].classList.contains("items")
  ) {
    placeItemsRandomly();
    return;
  }
  showItems(randomPosition);
  nbItems++;
}

for (let i = 0; i < Math.sqrt(gridWidth * gridHeight); i++) {
  placeItemsRandomly();
}

if (currentPosition === enemyCurrentPosition) {
  clearInterval(intervalID);
  console.log("COLLISION : GAME OVER");
}

decideMoveEnemy();
getEnemyPosition();
// click "play" to start game
// function pressPlay() {
//   const keyUp = buttonElement.addEventListener("keyup", function () {});
// }
