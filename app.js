const gameBoard = (function () {
  let field = ["", "X", "", "", "0", "", "", "", ""];
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

function Player(id, name, mark) {
  this.id = id;
  this.name = name;
  this.mark = mark;
}

const playerOne = new Player(0, "Ivan", "X");

const squares = document.querySelectorAll(".square");
gameBoard.displayField(squares);

squares.forEach((square) => {
  square.addEventListener("click", () => {
    if (!square.textContent) {
      square.textContent = playerOne.mark;
    }
  });
});
