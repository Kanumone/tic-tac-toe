const gameBoard = (function () {
  let field = ["", "", "", "", "", "", "", "", ""];
  function changeField(id, value) {
    if (!field[id]) {
      field[id] = value;
    }
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
  return { switchPlayer, getStatus };
})();

function Player(name, mark) {
  this.name = name;
  this.mark = mark;
}

Player.prototype.changeStatus = function () {
  this.status = this.status ? false : true;
};

const playerOne = new Player("Ivan", "X");
const playerTwo = new Player("Sergey", "0");

const squares = document.querySelectorAll(".square");

squares.forEach((square) => {
  square.addEventListener("click", () => {
    
    if (gameController.getStatus()) {
      gameBoard.changeField(square.id, playerOne.mark);
    } else {
      gameBoard.changeField(square.id, playerTwo.mark);
    }
    gameController.switchPlayer();
    gameBoard.displayField(squares);
  });
});
