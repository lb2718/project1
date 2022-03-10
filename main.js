// POP UP
const tryagainbutton = document.querySelector("#tryagain");
const popUp = document.querySelector("section.popUp");
const popUpBg = document.querySelector(".popUpContent");
const gameOver = document.querySelector(".gameover");
const tryAgain = document.querySelector(".tryagain");

tryagainbutton.addEventListener("click", function (event) {
  location.reload();
});

// startbutton.addEventListener("click", function (event) {
//   popUp.classList.add("hidden");
// });

tryagainbutton.addEventListener("click", function (event) {
  popUp.classList.add("hidden");
});

popUp.addEventListener("click", function () {
  popUp.classList.add("hidden");
});

// AUDIO
const fakeNews = document.querySelector(".fakenews");

// class Enemy {
//   constructor(position) {
//     this.position = position;
//   }
// }

const gridElement = document.querySelector(".grid");
const buttonElement = document.querySelector("button");
const scoreDisplay = document.querySelector("#itemsCaught");
// const imgElement = document.querySelector(".defaultPic");
const totalItems = +document.querySelector("#itemsTotal").textContent;

// Cells
const gridWidth = 8;
const gridHeight = 8;
const cells = [];

let score = 0;
let nbItems = 0;
let caughtItems = 0;
let randomDoorPosition;
let isThereADoor = false;

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
  // Show the enemy in the currentPosition
  cells[enemyCurrentPosition].classList.add("enemyImg");
  if (classToAdd) {
    cells[enemyCurrentPosition].classList.add(classToAdd);
  }
}

function showItems(position) {
  cells[position].classList.add("items");
}

function showDoor(position) {
  // placeDoorRandomly();
  cells[position].classList.add("door");
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

function catchItem(position) {
  if (cells[position].classList.contains("items")) {
    caughtItems++;
    scoreDisplay.textContent = caughtItems;
    cells[position].classList.remove("items");
  }
  if (caughtItems === totalItems && isThereADoor === false) {
    isThereADoor = true;
    placeDoorRandomly();
  }
}

function movePlayer(newPosition, classToAdd) {
  if (newPosition < 0) {
    return;
  }
  if (newPosition > gridWidth * gridHeight - 1) {
    return;
  }
  catchItem(newPosition);

  removePlayer();
  currentPosition = newPosition;
  if (currentPosition === randomDoorPosition) {
    removeWinner();
  }
  if (enemyCurrentPosition === currentPosition) {
    announceGameOver();
  }

  // Always show last
  showPlayer(classToAdd);
}

function announceGameOver() {
  clearInterval(intervalID);
  popUp.classList.remove("hidden");
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
  if (currentPosition === enemyCurrentPosition) {
    fakeNews.play();
    announceGameOver();
  }

  // Always show last
  showEnemy(classToAdd);
}

function decideMoveEnemy() {
  const randMove = Math.floor(Math.random() * 4);
  switch (randMove) {
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

// show initial position
showPlayer();

intervalID = setInterval(decideMoveEnemy, 200);

document.addEventListener("keydown", function (event) {
  // console.log(event.key, event.key, event.code);

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
  randomDoorPosition = Math.floor(Math.random() * cells.length);
  if (currentPosition === randomDoorPosition) {
    placeDoorRandomly();
    return;
  }
  showDoor(randomDoorPosition);
}

function removeWinner() {
  cells[currentPosition].classList.remove("playerImg");
  clearInterval(intervalID);
  popUpBg.style.backgroundColor = "rgb(203, 248, 203)";
  gameOver.textContent = "You won";
  tryAgain.textContent = "Play again";
  popUp.classList.remove("hidden");
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

for (let i = 0; i < +totalItems; i++) {
  placeItemsRandomly();
}

decideMoveEnemy();
getEnemyPosition();
