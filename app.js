const gameBoard = (function () {
  let field = ["", "", "", "", "", "", "", "", ""];
  function changeField(id, value) {
    field[id] = value;
  }
  function displayField(squares) {
    for (let i = 0; i < squares.length; i++) {
      squares[i].textContent = field[i];
    }
  }
  return { changeField, displayField };
})();

const gameController = (function () {
  let activePlayer = 0;
  function switchPlayer() {
    activePlayer = activePlayer ? 0 : 1;
  }
  function getStatus() {
    if (activePlayer) return true;
    else return false;
  }
  return { switchPlayer, getStatus };
})();

function Player(status, name, mark) {
  this.status = status;
  this.name = name;
  this.mark = mark;
}

Player.prototype.changeStatus = function () {
  this.status = this.status ? false : true;
};

const playerOne = new Player(true, "Ivan", "X");
const playerTwo = new Player(false, "Sergey", "0");

const squares = document.querySelectorAll(".square");
gameBoard.displayField(squares);

squares.forEach((square) => {
  square.addEventListener("click", () => {
    if (!square.textContent && playerOne.status) {
      square.textContent = playerOne.mark;
    }
    if (!square.textContent && playerTwo.status) {
      square.textContent = playerTwo.mark;
    }
    playerOne.changeStatus();
    playerTwo.changeStatus();
  });
});
