// POP-UP WINDOWS
const tryagainbutton = document.querySelector("#tryagain");
const popUp = document.querySelector("section.popUp");
const popUpBg = document.querySelector(".popUpContent");
const gameOver = document.querySelector(".gameover");
const tryAgain = document.querySelector(".tryagain");

// POP UP 2
const enterBtn = document.querySelector("#enterBtn");
const popUpStart = document.querySelector("section.popUpStart");
const popUpStartBg = document.querySelector(".popUpStartContent");

// Reload page when clicking "try again"
tryagainbutton.addEventListener("click", function (event) {
  location.reload();
});

// Reload page when clicking anywhere
popUp.addEventListener("click", function (event) {
  location.reload();
});

enterBtn.addEventListener("click", function (event) {
  popUpStart.classList.add("hide");
});

popUpStart.addEventListener("click", function (event) {
  popUpStart.classList.add("hide");
});

// AUDIO
const fakeNews = document.querySelector(".fakenews");
const goodjob = document.querySelector(".goodjob");
const winsound = document.querySelector(".winsound");
const launch = document.querySelector(".launch");

const gridElement = document.querySelector(".grid");
const itemsCaught = document.querySelector("#itemsCaught");
// const imgElement = document.querySelector(".defaultPic");
const totalItems = +document.querySelector("#itemsTotal").textContent;

// Cells
const gridWidth = 8;
const gridHeight = 8;
const cells = [];

let caughtItems = 0;
let randomDoorPosition;
let isThereADoor = false;

// which cell index is the PLAYER at
const initialPosition = 0;
let currentPosition = initialPosition;

// which cell index is the ENEMY at
const enemyInitialPosition = gridWidth * gridHeight - 1;
let enemyCurrentPosition = enemyInitialPosition;

// Populate the grid
for (let i = 0; i < gridWidth * gridHeight; i++) {
  const cell = createCell();
  gridElement.appendChild(cell);
  // Save the cell
  cells.push(cell);
}

function createCell() {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  return cell;
}

function showPlayer() {
  // Show the player in the currentPosition
  cells[currentPosition].classList.add("playerImg");
}

function showEnemy() {
  // Show the enemy in the currentPosition
  cells[enemyCurrentPosition].classList.add("enemyImg");
}

function showItems(position) {
  cells[position].classList.add("items");
}

function showDoor(position) {
  cells[position].classList.add("door");
}

function removePlayer() {
  // Stop showing the player in the currentPosition
  cells[currentPosition].classList.remove("playerImg");
}

function removeEnemy() {
  // Stop showing the enemy in the currentPosition
  cells[enemyCurrentPosition].classList.remove("enemyImg");
}

function movePlayer(newPosition) {
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

  function catchItem(position) {
    if (cells[position].classList.contains("items")) {
      winsound.play();
      caughtItems++;
      itemsCaught.textContent = caughtItems;
      cells[position].classList.remove("items");
    }
    if (caughtItems === totalItems && isThereADoor === false) {
      isThereADoor = true;
      launch.play();
      placeDoorRandomly();
    }
  }

  // Always show last
  showPlayer();
}

function announceGameOver() {
  clearInterval(intervalID);
  popUp.classList.remove("hidden");
}

function moveEnemy(newPosition) {
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
  showEnemy();
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
  gameOver.textContent = "You won! Yay!";
  tryAgain.textContent = "Play again";
  popUp.classList.remove("hidden");
  goodjob.play();
}

// Position items randomly
function placeItemsRandomly() {
  const randomPosition = Math.floor(Math.random() * cells.length);
  if (
    randomPosition === initialPosition ||
    randomPosition === enemyInitialPosition ||
    cells[randomPosition].classList.contains("items") ||
    randomPosition === cells.length - 2
  ) {
    placeItemsRandomly();
    return;
  }
  showItems(randomPosition);
}

for (let i = 0; i < +totalItems; i++) {
  placeItemsRandomly();
}

decideMoveEnemy();
getEnemyPosition();
