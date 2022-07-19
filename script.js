const background = document.querySelector(".background");
const backgroundContainer = document.querySelector(".background-container");

const drawButton = document.querySelector(".draw");
const eraseButton = document.querySelector(".erase");
const circleButton = document.querySelector(".circle");
const smileyButton = document.querySelector(".smiley");
const blurButton = document.querySelector(".blur");
const clearButton = document.querySelector(".clear");
const controlButtons = document.querySelectorAll(".controls");

const greenButton = document.getElementById("green");
const orangeButton = document.getElementById("orange");
const yellowButton = document.getElementById("yellow");
const redButton = document.getElementById("red");
const blueButton = document.getElementById("blue");
const purpleButton = document.getElementById("purple");
const blackButton = document.getElementById("black");
const greyButton = document.getElementById("grey");
const pinkButton = document.getElementById("pink");
const rainbowButton = document.getElementById("rainbow");
const colorButtons = document.querySelectorAll(".colors");

// Refresh when "canvas" is resized
window.onresize = () => location.reload(); 

// Set defaults
let colorChoice = "green";
drawButton.classList.add("selected");
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

function draw(shape) {
    backgroundContainer.style.setProperty("cursor", "url(./images/paintbrush.png), auto");
    const tiles = document.querySelectorAll(".tile");
    tiles.forEach(tile => {
        tile.addEventListener("mouseover", () => {
            removeBlur(tile);
            getShape(tile, shape);
            getColor(colorChoice, tile);
            getPosition(tile);
        });
    });
}

function erase() {
    backgroundContainer.style.setProperty("cursor", "url(./images/eraser.png), auto");
    const tiles = document.querySelectorAll(".tile");
    tiles.forEach(tile => {
        tile.addEventListener("mouseover", () => {
            getShape(tile, "square");
            reset(tile);
        });
    });
}

function drawBlur() {
    backgroundContainer.style.setProperty("cursor", "url(./images/paintbrush.png), auto");
    const tiles = document.querySelectorAll(".tile");
    tiles.forEach(tile => {
        tile.addEventListener("mouseover", () => {
            getShape(tile, "circle");
            getColor(colorChoice, tile);
            getBlur(tile);
            getPosition(tile);
        });
    });
}

function getBlur(tile) {
    getBlurColor(tile);
    tile.classList.add("blurBrush");
}

function getBlurColor(tile) {
    if (colorChoice === "rainbow") tile.style.color = tile.style.backgroundColor;
    else tile.style.color = colorChoice;
}

function getColor(colorChoice, tile) {
    if (colorChoice === "rainbow") {
        const rainbow = ["#ec87b9", "#e75ea3", "#fbbd4e", "#fdd349", 
        "#8ed1b5", "#55cbcb", "#44b0c6", "#757acd", "#e272d5"];
        let randomColor = getRandomNumber(rainbow);
        tile.style.backgroundColor = rainbow[randomColor];
    } 
    else tile.style.backgroundColor = colorChoice;
}

function getPosition(tile) {
    const positions = ["translateX(-20px)", "translateX(20px)", "translateY(-20px)", "translateY(20px)"];
    let randomPosition = getRandomNumber(positions);
    tile.style.transform = positions[randomPosition];
}

function getShape(tile, shape) {
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

function getRandomNumber(array) {
    let randomNumber = Math.floor(Math.random() * array.length);
    return randomNumber;
}

function reset(tile) {
    removeBlur(tile);
    tile.style.backgroundImage = "none";
    tile.style.backgroundColor = "white";
}

function removeBlur(tile) {
    tile.classList.remove("blurBrush");
}

function clearBoard() {
    backgroundContainer.style.setProperty("cursor", "auto");
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

function setButtonColor(button) {
    if (button !== rainbowButton) button.style.backgroundColor = button.id;
}

function setColorChoice(button) {
    button.addEventListener("click", () => {
        colorChoice = button.id;
    });
}

// Event listeners

// Controls
drawButton.addEventListener("click", () => draw("square"));
circleButton.addEventListener("click", () => draw("circle"));
smileyButton.addEventListener("click", () => draw("smiley"));
blurButton.addEventListener("click", () => drawBlur());
eraseButton.addEventListener("click", () => erase());
clearButton.addEventListener("click", () => {
    clearBoard();
    fillBoard();
});
controlButtons.forEach(button => {
    button.addEventListener("click", () => {
        setSelectedButton(controlButtons, button);
        if (button === clearButton) button.classList.remove("selected"); // So "clear" doesn't remain selected after clicking it
    });
});

// Colors
colorButtons.forEach(button => {
    setButtonColor(button);
    setColorChoice(button);
    button.addEventListener("click", () => {
        setSelectedButton(colorButtons, button);
    });
});









