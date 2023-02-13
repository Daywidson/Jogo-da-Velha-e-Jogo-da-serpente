/*!
* Start Bootstrap - One Page Wonder v6.0.5 (https://startbootstrap.com/theme/one-page-wonder)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-one-page-wonder/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
const winningMessage = document.querySelector("[data-winning-message]");
const restartButton = document.querySelector("[data-restart-button]");

let isCircleTurn;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const startGame = () => {
  isCircleTurn = false;

  for (const cell of cellElements) {
    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  }

  setBoardHoverClass();
  winningMessage.classList.remove("show-winning-message");
};

const endGame = (isDraw) => {
  if (isDraw) {
    winningMessageTextElement.innerText = "Empate!";
  } else {
    winningMessageTextElement.innerText = isCircleTurn
      ? "O Venceu!"
      : "X Venceu!";
  }

  winningMessage.classList.add("show-winning-message");
};

const checkForWin = (currentPlayer) => {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};

const checkForDraw = () => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
};

const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
  board.classList.remove("circle");
  board.classList.remove("x");

  if (isCircleTurn) {
    board.classList.add("circle");
  } else {
    board.classList.add("x");
  }
};

const swapTurns = () => {
  isCircleTurn = !isCircleTurn;

  setBoardHoverClass();
};

const handleClick = (e) => {
  // Colocar a marca (X ou Círculo)
  const cell = e.target;
  const classToAdd = isCircleTurn ? "circle" : "x";

  placeMark(cell, classToAdd);

  // Verificar por vitória
  const isWin = checkForWin(classToAdd);

  // Verificar por empate
  const isDraw = checkForDraw();

  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  } else {
    // Mudar símbolo
    swapTurns();
  }
};

startGame();

restartButton.addEventListener("click", startGame);
const gameBoard = document.getElementById("game-board");
const startButton = document.getElementById("start-button");
const snake = [];
let apple = null;
let gameStarted = false;

// Create the initial snake
for (let i = 4; i >= 0; i--) {
  snake.push({ x: i, y: 0 });
}

// Place an apple on the game board
const placeApple = () => {
  const x = Math.floor(Math.random() * 50);
  const y = Math.floor(Math.random() * 50);
  apple = { x, y };
};
placeApple();

// Draw the snake and the apple on the game board
const draw = () => {
  for (const unit of snake) {
    const snakeUnit = document.createElement("div");
    snakeUnit.style.left = `${unit.x * 10}px`;
    snakeUnit.style.top = `${unit.y * 10}px`;
    snakeUnit.classList.add("snake-unit");
    gameBoard.appendChild(snakeUnit);
  }
  const appleUnit = document.createElement("div");
  appleUnit.style.left = `${apple.x * 10}px`;
  appleUnit.style.top = `${apple.y * 10}px`;
  appleUnit.classList.add("apple-unit");
  gameBoard.appendChild(appleUnit);
};

// Move the snake in the specified direction
const moveSnake = (dx, dy) => {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  if (snake[0].x === apple.x && snake[0].y === apple.y) {
    placeApple();
  } else {
    snake.pop();
  }
};

// Start the game on button click
startButton.addEventListener("click", () => {
  gameStarted = true;
  gameBoard.innerHTML = "";
  draw();
  });
  
  // Control the snake with arrow keys
  document.onkeydown = (e) => {
  if (!gameStarted) {
  return;
  }
  switch (e.keyCode) {
  case 65:
  moveSnake(-1, 0);
  break;
  case 87:
  moveSnake(0, -1);
  break;
  case 68:
  moveSnake(1, 0);
  break;
  case 83:
  moveSnake(0, 1);
  break;
  }
  gameBoard.innerHTML = "";
  draw();
  };
