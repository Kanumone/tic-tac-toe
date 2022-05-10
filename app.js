const gameBoard = (function () {
  let field = ["", "", "", "", "", "", "", "", ""];
  function changeField(id, value) {
    let result;
    if (!field[id]) {
      field[id] = value;
      result = field;
      return result;
    }
    return false;
  }
  function displayField(squares) {
    for (let i = 0; i < squares.length; i++) {
      squares[i].textContent = field[i];
    }
  }
  return { changeField, displayField };
})();

const gameController = (function () {
  let activePlayer = 1;
  let gameStatus = 1;

  function switchPlayer() {
    activePlayer = activePlayer ? 0 : 1;
  }

  function getPlayer() {
    return activePlayer ? true : false;
  }

  function getGameStatus() {
    return gameStatus ? true : false;
  }

  function checkGame(field) {
    let winner;
    for (let i = 0; i < 8; i++) {
      if (i <= 2) {
        if (field[i] && field[i + 3] === field[i] && field[i + 6] === field[i]) {
          winner = { mark: field[i], elements: [i, i + 3, i + 6] };
        } else if (field[0] && field[i + 4] === field[i] && field[i + 8] === field[i]) {
          winner = { mark: field[i], elements: [i, i + 4, i + 8] };
        } else if (i == 2 && field[i] && field[i + 2] === field[i] && field[i + 4] === field[i]) {
          winner = { mark: field[i], elements: [i, i + 2, i + 4] };
        }
      }

      if (i % 3 === 0 && field[i] && field[i + 1] === field[i]
        && field[i + 2] === field[i]) {
        winner = { mark: field[i], elements: [i, i + 1, i + 2] };
      }
    }
    return winner ? winner : false;
  }

  function gameOver(winner) {
    const winnerDisplay = document.querySelector('.result');
    winnerDisplay.textContent = `Winner is ${winner.mark}`;
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const element = document.getElementById(winner.elements[i]);
        element.style.cssText = "font-weight: bold; background-color: coral";
      }, i * 300);
    }
    setTimeout(() => {
      winnerDisplay.style.opacity = "1";
    }, 1000);
    gameStatus = 0;
  }
  return { switchPlayer, getPlayer, checkGame, gameOver, getGameStatus };
})();

function Player(name, mark) {
  this.name = name;
  this.mark = mark;
}

const playerOne = new Player("Ivan", "X");
const playerTwo = new Player("Sergey", "0");

const squares = document.querySelectorAll(".square");
const field = document.querySelector(".field");

squares.forEach((square) => {
  square.addEventListener("click", () => {
    let fieldStatus;
    if (gameController.getPlayer()) {
      fieldStatus = gameBoard.changeField(square.id, playerOne.mark);
    } else {
      fieldStatus = gameBoard.changeField(square.id, playerTwo.mark);
    }
    if (fieldStatus && gameController.getGameStatus()) {
      let winner = gameController.checkGame(fieldStatus);
      gameController.switchPlayer();
      gameBoard.displayField(squares);
      if (winner) {
        gameController.gameOver(winner);
      }
    }

  });
});
