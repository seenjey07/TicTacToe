const X = "X";
const O = "O";

let currentPlayer = "";
let moveHistory = [];
let currentMove = -1;
let isGameOver = false;

let ticTacToeBoard = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

function printTicTacToeBoard(board = ticTacToeBoard) {
  board.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      let cellId = rowIndex * 3 + cellIndex;
      document.getElementById(cellId).innerText = cell;
    });
  });
  return board;
}

document.addEventListener("DOMContentLoaded", function () {
  const choosePlayerText = document.getElementById("choosePlayerText");
  const playerX = document.getElementById("playerX");
  const playerO = document.getElementById("playerO");
  const takeTurnText = document.getElementById("takeTurnText");
  const playerXorO = document.getElementById("playerXorO");
  const chooseTurnText = document.getElementById("chooseTurnText");
  const buttonYes = document.getElementById("buttonYes");
  const buttonNo = document.getElementById("buttonNo");

  playerX.addEventListener("click", () => {
    choosePlayer(X);
  });

  playerO.addEventListener("click", () => {
    choosePlayer(O);
  });

  function choosePlayer(selectedPlayer) {
    choosePlayerText.style.display = "none";
    playerX.style.display = "none";
    playerO.style.display = "none";
    // Update the text to show which player was selected by the user
    chooseTurnText.style.display = "block";
    chooseTurnText.textContent = `You are Player ${selectedPlayer}. Do you want to go first?`;

    buttonYes.style.display = "inline-flex";
    buttonNo.style.display = "inline-flex";

    buttonYes.addEventListener("click", () => {
      startGame(selectedPlayer, true); // Start the game with the selected player going first
    });

    buttonNo.addEventListener("click", () => {
      startGame(selectedPlayer, false); // Start the game with the selected player going second
    });
  }

  function startGame(selectedPlayer, isFirstTurn) {
    chooseTurnText.style.display = "none";
    buttonYes.style.display = "none";
    buttonNo.style.display = "none";

    takeTurnText.style.display = "block";

    if (isFirstTurn) {
      playerXorO.textContent = selectedPlayer;
    } else {
      playerXorO.textContent = selectedPlayer === X ? O : selectedPlayer;
    }

    currentPlayer = selectedPlayer;
    if (!isFirstTurn) {
      currentPlayer = currentPlayer === X ? O : X;
    }

    updateTakeTurnText();
  }
});

function updateTakeTurnText() {
  if (isGameOver) {
    takeTurnText.textContent = "It's a game over";
  } else {
    takeTurnText.textContent = `Player ${currentPlayer}, take your turn.`;
  }
}

//Insert codes for wins and draws
function winner(currentPlayer) {
  // Check rows
  for (let row = 0; row < 3; row++) {
    if (
      ticTacToeBoard[row][0] === currentPlayer &&
      ticTacToeBoard[row][1] === currentPlayer &&
      ticTacToeBoard[row][2] === currentPlayer
    ) {
      return true;
    }
  }

  // Check columns
  for (let col = 0; col < 3; col++) {
    if (
      ticTacToeBoard[0][col] === currentPlayer &&
      ticTacToeBoard[1][col] === currentPlayer &&
      ticTacToeBoard[2][col] === currentPlayer
    ) {
      return true;
    }
  }

  // Check diagonals
  if (
    (ticTacToeBoard[0][0] === currentPlayer &&
      ticTacToeBoard[1][1] === currentPlayer &&
      ticTacToeBoard[2][2] === currentPlayer) ||
    (ticTacToeBoard[0][2] === currentPlayer &&
      ticTacToeBoard[1][1] === currentPlayer &&
      ticTacToeBoard[2][0] === currentPlayer)
  ) {
    return true;
  }
}

function itsATie() {
  return moveHistory.length === 9;
}

function gameResult(currentPlayer) {
  if (winner(currentPlayer)) {
    alert(`Player ${currentPlayer} wins!`);
    gameOver();
  } else if (itsATie()) {
    alert("The game is a draw!");
    gameOver();
  } else {
    currentPlayer = currentPlayer === X ? O : X;
  }
}

function gameOver() {
  isGameOver = true;
  updateButtonsDisplay();
}

function previous() {
  if (currentMove > 0) {
    currentMove--;
    const previousMove = moveHistory[currentMove];
    printTicTacToeBoard(previousMove);
  }
  updateButtonsDisplay();
}

function next() {
  if (currentMove < moveHistory.length) {
    currentMove++;
    const nextMove = moveHistory[currentMove];
    printTicTacToeBoard(nextMove);
  }
  updateButtonsDisplay();
}

//Hide and show previous and next buttons
function updateButtonsDisplay() {
  if (isGameOver) {
    if (currentMove === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-flex";
    }

    if (currentMove < moveHistory.length - 1) {
      nextButton.style.display = "inline-flex";
    } else {
      nextButton.style.display = "none";
    }
  }
}

function resetGame() {
  location.reload();
}

function mark(square, squareID) {
  if (!isGameOver && currentPlayer !== "" && square.textContent === "") {
    updateBoard(currentPlayer, squareID);

    gameResult(currentPlayer);

    currentPlayer = currentPlayer === O ? X : O;
    updateTakeTurnText();
  }
}

function updateBoard(currentPlayer, squareID) {
  const index = Number(squareID);
  const rowIndex = Math.floor(index / 3);
  const columnIndex = index % 3;

  ticTacToeBoard[rowIndex][columnIndex] = currentPlayer;
  printTicTacToeBoard();

  const updatedTicTacToeBoard = JSON.parse(JSON.stringify(ticTacToeBoard));
  moveHistory.push(updatedTicTacToeBoard);

  currentMove++;
}
