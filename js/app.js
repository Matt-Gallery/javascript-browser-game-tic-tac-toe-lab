/*-------------------------------- Constants --------------------------------*/

const choices = ["X", "O"];

/*---------------------------- Variables (state) ----------------------------*/

let board = ["X", "", "", "", "", "", "", "", ""];
let turn = "X";
let winner = false;
let tie = false;

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll(".sqr");
const messageEl = document.querySelector("#message");
const resetBtnEl = document.querySelector("#resetBtn");

/*-------------------------------- Functions --------------------------------*/

init();

function init() {
  board = ["", "", "", "", "", "", "", "", ""];
  turn = "X";
  winner = false;
  tie = false;
  render();
}

function handleClick(event) {
  const idx = parseInt(event.target.id);
  if (board[idx] || winner) return;

  board[idx] = turn;
  checkForWinner();
  checkForTie();
  turn = turn === "X" ? "O" : "X";
  render();
}

function checkForWinner() {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combo of winningCombos) {
    if (
      board[combo[0]] &&
      board[combo[0]] === board[combo[1]] &&
      board[combo[0]] === board[combo[2]]
    ) {
      winner = board[combo[0]];
      return;
    }
  }
}

function checkForTie() {
  tie = !winner && board.every((cell) => cell !== "");
}

function render() {
  updateBoard();
  updateMessage();
}

function updateBoard() {
  board.forEach((cell, idx) => {
    squareEls[idx].textContent = cell;
  });
}

function updateMessage() {
  if (winner) {
    messageEl.textContent = `${winner} wins!`;
  } else if (tie) {
    messageEl.textContent = "It's a tie!";
  } else {
    messageEl.textContent = `${turn}'s turn`;
  }
}

/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach((square) => {
  square.addEventListener("click", handleClick);
});

resetBtnEl.addEventListener("click", init);
