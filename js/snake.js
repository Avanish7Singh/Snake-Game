let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("../music/food.mp3");
const gameOver = new Audio("../music/gameover.mp3");
const moveSound = new Audio("../music/move.mp3");
const musicSound = new Audio("../music/music.mp3");
// let board = document.getElementsByClassName("board")
let speed = 6;
let lastPrintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
]
let food = { x: 5, y: 6 }
let score = 0;

function main(ctime) {
    window.requestAnimationFrame(main)
    // console.log(ctime)
    if ((ctime - lastPrintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPrintTime = ctime;
    gameEngine()
}
// collision logic
function isCollide(snake) {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
}

function gameEngine() {
    //    after collision
    if (isCollide(snakeArr)) {
        gameOver.play();
        musicSound.pause();
        inputDir = { x: 0, y: -1 };
        score = 0;
        scoreDetail.innerHTML = "Score -" + score;
        alert("Press enter/ok to start the game again!!!!");
        snakeArr = [{ x: 13, y: 15 }];
        musicSound.play();
    }
    // after eating food
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        score += 1;
        if (score > hiSocreVal) {
            hiSocreVal = score;
            localStorage.setItem("hiscore", JSON.stringify(hiSocreVal))
        }
        scoreDetail.innerHTML = "Score -" + score;
        foodSound.play()
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }
    // moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] }
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    // display snake
    board.innerHTML = " "
    snakeArr.forEach((e, index) => {
        let element = document.createElement("div");
        element.style.gridRowStart = e.y;
        element.style.gridColumnStart = e.x;
        if (index === 0) {
            element.classList.add("head");
        }
        else {
            element.classList.add("snakeBody");
        }

        board.appendChild(element);

    })

    //  display food
    let foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);

    // local storage
    let hiScore = localStorage.getItem("hiscore");
    if (hiScore === null) {
        hiSocreVal = 0;
        localStorage.setItem("hiscore", JSON.stringify(hiSocreVal))
    }
    else {
        hiSocreVal = JSON.parse(hiScore);
        hiScoreDetail.innerHTML = "HiScore - " + hiSocreVal;
    }
}

// start 
// musicSound.play();
window.requestAnimationFrame(main);
window.addEventListener('keydown', (e) => {
    inputDir = { x: 0, y: -1 }
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            // console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            // console.log("ArrowDown")
            break;

        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            // console.log("ArrowLeft")
            break;

        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            // console.log("ArrowRight")
            break;

        default:
            break;

    }
})