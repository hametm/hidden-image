const background = document.querySelector(".background");
const backgroundContainer = document.querySelector(".background-container");

const eraseButton = document.querySelector(".erase");
const drawButton = document.querySelector(".draw");
const blurButton = document.querySelector(".blur");
const clearButton = document.querySelector(".clear");
const controlButtons = document.querySelectorAll(".controls");

const rainbowButton = document.querySelector(".rainbow");
const blackButton = document.querySelector(".black");
const redButton = document.querySelector(".red");
const yellowButton = document.querySelector(".yellow");
const blueButton = document.querySelector(".blue");
const greenButton = document.querySelector(".green");
const colorButtons = document.querySelectorAll(".colors");

const squareButton = document.querySelector(".square");
const circleButton = document.querySelector(".circle");
const smileyButton = document.querySelector(".smiley");
const shapeButtons = document.querySelectorAll(".shapes");

const rainbow = ["#ec87b9", "#e75ea3", "#fbbd4e", "#fdd349", 
        "#8ed1b5", "#55cbcb", "#44b0c6", "#757acd", "#e272d5"];
const positions = ["translateX(-20px)", "translateX(20px)", "translateY(-20px)", "translateY(20px)"];

// Refresh when "canvas" is resized
window.onresize = () => location.reload(); 

// Set defaults
let shape = "square";
let colorChoice = "green";
drawButton.classList.add("selected");
squareButton.classList.add("selected");
greenButton.classList.add("selected"); 
fillBoard();
draw();

function fillBoard() {
    let rowCount = getRowCount();
    let columnCount = getColumnCount();
    for (let i = 0; i < rowCount * columnCount; i++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.style.backgroundColor = "white";
        background.appendChild(tile);
    }
}

function erase() {
    backgroundContainer.style.setProperty("cursor", "url(./images/eraser.png), auto");
    const tiles = document.querySelectorAll(".tile");
    tiles.forEach(tile => {
        tile.addEventListener("mouseover", () => {
            reset(tile);
            tile.style.backgroundImage = "none";
            tile.style.backgroundColor = "white";
        });
    });
}

function draw() {
    backgroundContainer.style.setProperty("cursor", "url(./images/paintbrush.png), auto");
    const tiles = document.querySelectorAll(".tile");
    tiles.forEach(tile => {
        tile.addEventListener("mouseover", () => {
            reset(tile);
            getColor(colorChoice, tile);
            getPosition(tile);
            getShape(tile);
        });
    });
}

function drawBlur() {
    backgroundContainer.style.setProperty("cursor", "url(./images/paintbrush.png), auto");
    const tiles = document.querySelectorAll(".tile");
    tiles.forEach(tile => {
        tile.addEventListener("mouseover", () => {
            getBlur(tile);
            getColor(colorChoice, tile);
            getPosition(tile);
            getShape(tile);
        });
    });
}

function getBlur(tile) {
    if (colorChoice === rainbow) {
        tile.classList.add("rainbowBlurBrush");
    }
    else {
        tile.style.color = colorChoice;
        tile.classList.add("blurBrush");
    }
}

function getColor(colorChoice, tile) {
    let color;
    if (colorChoice === rainbow) {
        let randomColor = Math.floor(Math.random() * colorChoice.length);
        color = colorChoice[randomColor];
    } else {
        color = colorChoice;
    }
   tile.style.backgroundColor = color;
}

function getPosition(tile) {
    let randomPosition = Math.floor(Math.random() * (positions.length));
    tile.style.transform = positions[randomPosition];
}

function getShape(tile) {
    switch(shape) {
        case "circle":
            tile.classList.remove("smileyShape");
            tile.classList.add("circleShape");
            break;
        case "square":
            tile.classList.remove("smileyShape");
            tile.classList.remove("circleShape");
            break;
        case "smiley":
            tile.classList.remove("circleShape");
            tile.classList.add("smileyShape");
            tile.style.backgroundImage = ("url(./images/smile.png");
            break;
    }
}

function reset(tile) {
    tile.classList.remove("blurBrush", "rainbowBlurBrush");
}

function clearBoard() {
    backgroundContainer.style.setProperty("cursor", "auto");
    background.style.backgroundImage = "none";
    const tiles = document.querySelectorAll(".tile");
    tiles.forEach(tile => {
        tile.remove();
    });
}

function setSelectedButton(buttons, button) {
    buttons.forEach(button => {
        button.classList.remove("selected");
    });
    button.classList.add("selected");
}

function getRowCount() {
    const gridComputedStyle = window.getComputedStyle(background);
    const gridRowCount = gridComputedStyle.getPropertyValue("grid-template-rows").split(" ").length;
    return gridRowCount;
}

function getColumnCount() {
    const gridComputedStyle = window.getComputedStyle(background);
    const gridColumnCount = gridComputedStyle.getPropertyValue("grid-template-columns").split(" ").length;
    return gridColumnCount;
}

// Event listeners

// Controls
eraseButton.addEventListener("click", () => erase());
drawButton.addEventListener("click", () => draw());
blurButton.addEventListener("click", () => drawBlur());
clearButton.addEventListener("click", () => {
    clearBoard();
    fillBoard();
});
controlButtons.forEach(button => {
    button.addEventListener("click", () => {
        setSelectedButton(controlButtons, button);
        if (button === clearButton) button.classList.remove("selected");
    });
});

// Colors
rainbowButton.addEventListener("click", () => colorChoice = rainbow);
blackButton.addEventListener("click", () => colorChoice = "black");
redButton.addEventListener("click", () => colorChoice = "red");
yellowButton.addEventListener("click", () => colorChoice = "yellow");
blueButton.addEventListener("click", () => colorChoice = "blue");
greenButton.addEventListener("click", () => colorChoice = "green");
colorButtons.forEach(button => {
    button.addEventListener("click", () => {
        setSelectedButton(colorButtons, button);
    });
});

// Shapes
squareButton.addEventListener("click", () => shape = "square");
circleButton.addEventListener("click", () => shape = "circle");
smileyButton.addEventListener("click", () => shape = "smiley");
shapeButtons.forEach(button => {
    button.addEventListener("click", () => {
        setSelectedButton(shapeButtons, button);
    })
});









