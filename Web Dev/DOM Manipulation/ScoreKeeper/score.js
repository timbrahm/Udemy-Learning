var p1Button = document.querySelector("#p1");
var p2Button = document.querySelector("#p2");
var resetButton = document.querySelector("#reset");
var p1Dis = document.querySelector("#p1Dis");
var p2Dis = document.querySelector("#p2Dis");
var numInput = document.querySelector("input");
var winningDis = document.querySelector("#winningNum");

var p1Score = 0;
var p2Score = 0;
var gameOver = false;
var winningScore = 5;

p1Button.addEventListener("click", function() {
  if (!gameOver) {
    p1Score++;
    if (p1Score === winningScore) {
      p1Dis.classList.add("winner");
      gameOver = true;
    }
    p1Dis.textContent = p1Score;
  }
});

p2Button.addEventListener("click", function() {
  if (!gameOver) {
    p2Score++;
    if (p2Score === winningScore) {
      p2Dis.classList.add("winner");
      gameOver = true;
    }
    p2Dis.textContent = p2Score;
  }
});

resetButton.addEventListener("click", reset);

function reset() {
  p1Score = 0;
  p1Dis.textContent = p1Score;
  p1Dis.classList.remove("winner");
  p2Score = 0;
  p2Dis.classList.remove("winner");
  p2Dis.textContent = p2Score;
  gameOver = false;
}

numInput.addEventListener("change", function() {
  winningDis.textContent = this.value;
  winningScore = Number(this.value);
  reset();
});
