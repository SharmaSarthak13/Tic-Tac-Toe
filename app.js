let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newgamebtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true; // Player O starts first

const winpatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const resetgame = () => {
    turn0 = true;
    enabledboxed();
    msgcontainer.classList.add("hide"); // Hide the winner message
};

const disableboxed = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

const enabledboxed = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = ""; // Clear the box content
    });
};

const showwinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}!`;
    msgcontainer.classList.remove("hide"); // Show the winner message
    disableboxed();
};

const checkwinner = () => {
    for (let pattern of winpatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos1val === pos2val && pos2val === pos3val) {
            showwinner(pos1val); // Announce the winner
            return; // Stop further checks
        }
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "O";
            turn0 = false;
        } else {
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true; // Disable clicked box
        checkwinner(); // Check if there's a winner
    });
});

newgamebtn.addEventListener("click", resetgame);
resetbtn.addEventListener("click", resetgame);
