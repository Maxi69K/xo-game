let img = document.getElementsByTagName('img')[0];
let box = document.querySelector('.box');
let startGame = document.querySelector('#startGame');
let restartGame = document.querySelector('#restartGame');
let computerPlayer = document.querySelector('#computerPlayer');
let computerPlayerOff = document.querySelector('#computerPlayerOff');
let message = document.querySelector('#message');
let boxes = document.querySelectorAll('.xo');
startGame.addEventListener('click', showTable);
restartGame.addEventListener('click', resetTable);
computerPlayer.addEventListener('click', compPlay)
computerPlayerOff.addEventListener('click', removeCompPlayer);
let symbol = null;
let completed = 1;
let playerO = null;

let lines = [
    [boxes[0], boxes[1], boxes[2]],
    [boxes[3], boxes[4], boxes[5]],
    [boxes[6], boxes[7], boxes[8]],
    [boxes[0], boxes[3], boxes[6]],
    [boxes[1], boxes[4], boxes[7]],
    [boxes[2], boxes[5], boxes[8]],
    [boxes[0], boxes[4], boxes[8]],
    [boxes[2], boxes[4], boxes[6]]
];

function showTable() {
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].style.display = "block";
    }
    img.style.display = "none";
    startGame.style.display = "none";
    restartGame.style.display = "block";
    computerPlayer.style.display = "block";
    computerPlayerOff.style.display = "block";
    addClick();
}

function resetTable() {
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].innerHTML = "";
        boxes[i].style.background = "blue";
    }
    symbol = null;
    message.innerHTML = "";
    addClick();
    completed = 1;
}

function addClick() {
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener('click', insertSymbol);
    }
}

function stopClicks() {
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].removeEventListener('click', insertSymbol);
    }
}

function insertSymbol() {
    (symbol == "X") ? symbol = "O": symbol = "X";
    this.innerHTML = symbol;
    if (this.innerHTML == "X") {
        completed++;
        this.removeEventListener('click', insertSymbol);
        if (playerO === "on") {
            compPlayer();
        }
    }
    checkLines();
}

function compPlay() {
    playerO = "on";
}

function removeCompPlayer() {
    playerO = "off";
}

function compPlayer() {
    let randNo = Math.floor(Math.random() * boxes.length);
    let randbox = boxes[randNo];
    if (randbox.innerHTML == "") {
        randbox.innerHTML = "O";
        symbol = "O";
        completed++;
        randbox.removeEventListener('click', insertSymbol);
    } else if (completed < 9) {
        compPlayer();
    }
}

function checkLines() {
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        if (line[0].innerHTML == line[2].innerHTML && line[0].innerHTML == line[1].innerHTML && line[0].innerHTML != "") {
            for (let k = 0; k < line.length; k++) {
                line[k].style.background = "red";
                stopClicks();
                if (line[k].innerHTML == "X") {
                    message.innerHTML = "The winner is player X";
                } else {
                    message.innerHTML = "The winner is player O";
                }
            }
        }
    }
}