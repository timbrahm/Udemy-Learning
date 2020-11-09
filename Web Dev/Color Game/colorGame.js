var numSquares = 6;
var colors = [];
var goalColor;

var squares = document.querySelectorAll(".square");
var colorDis = document.querySelector("#colorDis");
var messageDis = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
  // mode buttons
  setupModeButtons();

  //squares
  setupSquares();

  reset();
}

function setupModeButtons() {
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");

      if (this.textContent === "Easy") {
        numSquares = 3;
      }
      else {
        numSquares = 6;
      }

      reset();
    });
  }
}

function setupSquares(){
  for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", function() {
      var clickedColor = this.style.backgroundColor;
      if (clickedColor === goalColor) {
        changeColors(clickedColor);
        messageDis.textContent = "Correct!"
        h1.style.backgroundColor = clickedColor;
        resetButton.textContent = "Play Again?";
        }
      else {
        this.style.backgroundColor = "#232323";
        messageDis.textContent = "Try Again";
      }
    });
  }
}


function reset() {
  colors = generateRandomColors(numSquares);
  goalColor = pickColor();
  colorDis.textContent = goalColor;
  messageDis.textContent = "";
  for (var i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    }
    else {
      squares[i].style.display = "none";
    }
  }
  h1.style.backgroundColor = "steelBlue";
  resetButton.textContent = "New Colors";
}


resetButton.addEventListener("click", reset);


function changeColors(color) {
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = color;
  }
}

function pickColor() {
  var index = Math.floor(Math.random() * colors.length);
  return colors[index];
}

function generateRandomColors(numColors) {
  var arr = [];

  for (var i = 0; i < numColors; i++) {
    arr.push(randomColor());
  }

  return arr;
}

function randomColor() {
  var red = Math.floor(Math.random() * 256);
  var green = Math.floor(Math.random() * 256);
  var blue = Math.floor(Math.random() * 256);

  return "rgb(" + red + ", " + green + ", " + blue + ")";
}
