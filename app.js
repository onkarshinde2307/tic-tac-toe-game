let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".reset-btn");
let newGamebtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;

const winpatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  msgcontainer.classList.add("hidden");
  enableboxes();
  boxes.forEach((box) => (box.innerText = ""));
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText === "") {
      if (turnO) {
        box.innerText = "O";
        box.style.color = "#050404";  
        turnO = false;
      } else {
        box.innerText = "X";
        box.style.color = "#4C2719";  
        turnO = true;
      }
      checkWinner();
    }
  });
});

const enableboxes = () => {
  for (let box of boxes) {
    box.disabled = false;
  }
};

const disableboxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const showwinner = (winner) => {
  msg.innerText = `🎉 Congratulations, Winner is ${winner}!`;
  msgcontainer.classList.remove("hidden");
  disableboxes();
};

const showDraw = () => {
  msg.innerText = "😮 It's a Draw!";
  msgcontainer.classList.remove("hidden");
};

const checkWinner = () => {
  for (let pattern of winpatterns) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        showwinner(pos1val);
        return;
      }
    }
  }

  // check draw
  let filled = [...boxes].every((box) => box.innerText !== "");
  if (filled) {
    showDraw();
  }
};

newGamebtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
