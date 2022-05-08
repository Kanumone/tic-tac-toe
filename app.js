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
  function switchPlayer() {
    activePlayer = activePlayer ? 0 : 1;
  }
  function getStatus() {
    if (activePlayer) return true;
    else return false;
  }
  function checkGame(field) {
    for (let i = 0; i < 8; i++) {
      if (i <= 2) {
        if (field[i] && field[i + 3] === field[i] && field[i + 6] === field[i]) {
          console.log(`${field[i]} won`);
        } else if (field[0] && field[i + 4] === field[i] && field[i + 8] === field[i]) {
          console.log(`${field[i]} won`);
        } else if (field[2] && field[i + 2] === field[i] && field[i + 4] === field[i]) {
          console.log(`${field[i]} won`);
        }
      }

      if (i % 3 === 0 && field[i] && field[i + 1] === field[i]
          && field[i + 2] === field[i]) {
            console.log(`${field[i]} won`);
      }
    }
  }
  return { switchPlayer, getStatus, checkGame };
})();

function Player(name, mark) {
  this.name = name;
  this.mark = mark;
}

const playerOne = new Player("Ivan", "X");
const playerTwo = new Player("Sergey", "0");

const squares = document.querySelectorAll(".square");

squares.forEach((square) => {
  square.addEventListener("click", () => {
    let changeStatus;
    if (gameController.getStatus()) {
      changeStatus = gameBoard.changeField(square.id, playerOne.mark);
    } else {
      changeStatus = gameBoard.changeField(square.id, playerTwo.mark);
    }
    if (changeStatus) {
      gameController.switchPlayer();
      gameController.checkGame(changeStatus);
    }
    gameBoard.displayField(squares);
  });
});
