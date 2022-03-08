const gridElement = document.querySelector(".grid");
const buttonElement = document.querySelector("button");
const scoreDisplay = document.querySelector("itemsCaught");
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

// add "remove" items après qu'ils soient caught
function catchItem(position) {
  cells[position].classList.add("caught");
}
catchItem(currentPosition);

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

function openDoor() {}

function catchItem() {
  console.log(currentPosition, "-----");
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

  // Collision => life bar - 50%
  //   if (currentPosition === enemyCurrentPosition) {
  //     clearInterval(intervalID);
  //    itemsDisplay - 50 / 100;
  //    return itemsDisplay
  //   }

  // Block access to cells containing the items (to the enemy)
  // function blockCellsEnemy() {
  //   switch (positionToItem) {
  //     // when enemy is in cell above item, enemey can't go down
  //     case (enemyCurrentPosition = itemsPosition - 8):
  //       removeEnemy;
  //       break;
  //     // when enemy is in cell below item
  //     case (enemyCurrentPosition = itemsposition + 8):
  //       // enemy can't go up
  //       break;
  //     case (enemyCurrentPosition = itemsPosition - 1):
  //       // enemy can't go right
  //       break;
  //     case (enemyCurrentPosition = itemsPosition + 1):
  //       // enemy can't go left
  //       break;
  //   }
  // }

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
      if (enemyCurrentPosition % gridWidth === 0) {
        break;
      }
      if (cells[enemyCurrentPosition - 1].classList.contains("items")) {
        decideMoveEnemy();
        break;
      }
      moveEnemy(enemyCurrentPosition - 1);
      break;
    // Enemy goes right
    case 3:
      if (enemyCurrentPosition % gridWidth === gridWidth - 1) {
        break;
      }
      if (cells[enemyCurrentPosition + 1].classList.contains("items")) {
        decideMoveEnemy();
        break;
      }
      moveEnemy(enemyCurrentPosition + 1);
      break;
  }
}

function getEnemyPosition() {
  let enemy = document.querySelector(".enemyImg");
  console.log(enemy.dataset);
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

function randomlyPlaceItems() {
  const randomPosition = Math.floor(Math.random() * cells.length);
  showItems(randomPosition);
  nbItems++;
}

for (let i = 0; i < Math.sqrt(gridWidth * gridHeight); i++) {
  randomlyPlaceItems();
  console.log("nbItems", nbItems);
}

// showItems();
decideMoveEnemy();
getEnemyPosition();

// click "play" to start game
// function pressPlay() {
//   const keyUp = buttonElement.addEventListener("keyup", function () {});
// }
