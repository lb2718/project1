const gridElement = document.querySelector(".grid");

// Cells
const gridWidth = 9;
const gridHeight = 9;
const cells = [];

// let score = 0;

// let nbMarmelade = 0;
// let eatenMarmalades = 0;

// // which CELL INDEX is the character at
const initialPosition = 0;
let currentPosition = initialPosition;

// which CELL INDEX is the enemy at
const enemyInitialPosition = gridWidth * gridHeight - 1;
let enemyCurrentPosition = enemyInitialPosition;

// Populate the grid
for (let i = 0; i < gridWidth * gridHeight; i++) {
  const cell = createCell();
  gridElement.appendChild(cell);
  // save the cell for later!
  cells.push(cell);
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
  if (classToAdd) {
    cells[enemyCurrentPosition].classList.add(classToAdd);
  }
}

// function showMarmalade(position) {
//   cells[position].classList.add("goodItems");
// }

// function eatMarmalade(position) {
//   cells[position].classList.add("eaten");
// }

// Pour changer de case
function removePlayer() {
  // Stop showing the player in the currentPosition
  cells[currentPosition].classList.remove("playerImg", "left");
}

// function removeNpg() {
//   // Stop showing the player in the currentPosition
//   cells[npgCurrentPosition].classList.remove("enemyImg", "left");
// }

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
  //     console.log("EVIL PADDINGTON SCORE", npgScore);
  //   }

  // Always show last
  showPlayer(classToAdd);
}

// function moveNpg(newPosition, classToAdd) {
//   if (newPosition < 0) {
//     return;
//   }
//   if (newPosition > gridWidth * gridHeight - 1) {
//     return;
//   }

//   removeNpg();
//   npgCurrentPosition = newPosition;

//   if (currentPosition === npgCurrentPosition) {
//     clearInterval(intervalID);
//     console.log("COLLISION : GAME OVER");
//   }
//   if (isUneatenMarmalade(newPosition)) {
//     npgScore += 50;
//     console.log("EVIL PADDINGTON ATE YOUR MARMELADE", npgScore);
//     eatMarmalade(newPosition);
//     eatenMarmalades++;
//     console.log("eatenMarmalades", eatenMarmalades);
//   }
//   if (eatenMarmalades === nbMarmelade) {
//     clearInterval(intervalID);
//     console.log("NO MORE MARMELADE : GAME OVER");
//     console.log("YOU SCORE ", score);
//     console.log("EVIL PADDINGTON SCORE", npgScore);
//   }

//   // Always show last
//   showNpg(classToAdd);
// }

// function decideMoveNpg() {
//   const randMove = Math.floor(Math.random() * 4);
//   console.log("randmove", randMove);
//   switch (randMove) {
//     case 0:
//       moveNpg(npgCurrentPosition - gridWidth);
//       break;
//     case 1:
//       moveNpg(npgCurrentPosition + gridWidth);
//       break;
//     case 2:
//       if (npgCurrentPosition % gridWidth === 0) {
//         break;
//       }
//       moveNpg(npgCurrentPosition - 1);
//       break;
//     case 3:
//       if (npgCurrentPosition % gridWidth === gridWidth - 1) {
//         break;
//       }
//       moveNpg(npgCurrentPosition + 1);
//       break;
//   }
// }

// function isUneatenMarmalade(position) {
//   const isMarmalade = cells[position].classList.contains("marmalade");
//   const isEaten = cells[position].classList.contains("eaten");
//   return isMarmalade && !isEaten;
// }

// // show initial position
// showNpg();
showPlayer();
// intervalID = setInterval(decideMoveNpg, 1000);

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

// function randomlyPlaceMarmalade() {
//   const randomPosition = Math.floor(Math.random() * cells.length);
//   showMarmalade(randomPosition);
//   nbMarmelade++;
// }

// for (let i = 0; i < Math.sqrt(gridWidth * gridHeight); i++) {
//   randomlyPlaceItems();
//   console.log("nbMarmelade", nbMarmelade);
// }
