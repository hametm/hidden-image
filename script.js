const background = document.querySelector(".background");
const backgroundContainer = document.querySelector(".background-container");

const squareButton = document.getElementById("square");
const eraseButton = document.getElementById("eraser");
const circleButton = document.getElementById("circle");
const smileyButton = document.getElementById("smiley");
const squareOutlineButton = document.getElementById("square-outline");
const circleOutlineButton = document.getElementById("circle-outline");
const blurButton = document.getElementById("blur");
const dinosaurButton = document.getElementById("dinosaur");
const clearButton = document.getElementById("clear");
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

// Refresh when the "canvas" is resized
window.onresize = () => location.reload(); 

// Allow for scrolling when the page is too small for all the
setSidebarHeight();

// Set defaults
let colorChoice = "green";
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

function draw(shape) {
    backgroundContainer.style.setProperty("cursor", "url(./images/paintbrush.png), auto");
    const tiles = document.querySelectorAll(".tile");
    tiles.forEach(tile => {
        tile.addEventListener("mouseover", () => {
            removeStyles(tile);
            getColor(colorChoice, tile);
            getShape(tile, shape);
            getPosition(tile);
        });
    });
}

function erase() {
    backgroundContainer.style.setProperty("cursor", "url(./images/eraser-cursor.png), auto");
    const tiles = document.querySelectorAll(".tile");
    tiles.forEach(tile => {
        tile.addEventListener("mouseover", () => {
            getShape(tile, "square");
            reset(tile);
        });
    });
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
            tile.classList.add("circleShape");
            break;
        case "square":
            break;
        case "smiley":
            tile.classList.add("smileyShape");
            tile.style.backgroundImage = "url(./images/smiley-face.png)";
            break;
        case "squareOutline": 
            tile.classList.add("outlineShape");
            break;
        
        case "circleOutline": 
            tile.classList.add("circleShape", "outlineShape");
            break;
        case "dinosaur": 
            tile.style.backgroundImage = `url(./images/${getRandomImage()}.png)`;
            tile.classList.add("dinosaurShape");
            break;
        case "blur":
            getBlurColor(tile);
            tile.classList.add("blurShape");
    }
}

function getRandomNumber(array) {
    let randomNumber = Math.floor(Math.random() * array.length);
    return randomNumber;
}

function getRandomImage() {
    const images = ["allosaurus", "tyrannosaurus", "triceratops", "brachiosaurus", "stegosaurus",
        "parasaurolophus"];
    let randomImage = getRandomNumber(images);
    return images[randomImage];
}

function reset(tile) {
    removeStyles(tile);
    tile.style.boxShadow = "none";
    tile.style.backgroundImage = "none";
    tile.style.backgroundColor = "white";
}

function removeStyles(tile) {
    tile.classList.remove("smileyShape", "outlineShape", "circleShape", "dinosaurShape", "blurShape");
    tile.style.backgroundImage = "none";
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

function setButtonColor(button) {
    if (button !== rainbowButton) button.style.backgroundColor = button.id;
}

function setButtonIcon(button) {
    button.style.backgroundImage = `url(./images/${button.id}.png)`;
}

function setColorChoice(button) {
    button.addEventListener("click", () => {
        colorChoice = button.id;
    });
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

function setSidebarHeight() {
    const header = document.querySelector("header");
    const container = document.querySelector(".control-buttons-container");
    let headerComputedStyle = window.getComputedStyle(header);
    let headerHeight = headerComputedStyle.getPropertyValue("height");
    let windowHeight = window.innerHeight;

    let headerHeighArray = headerHeight.split("");
    headerHeighArray.splice(-2, 2);
    let newHeaderHeight = headerHeighArray.join("");

    container.style.height= `${(windowHeight - newHeaderHeight) - 15}px`;
}

// Event listeners

// Controls
squareButton.addEventListener("click", () => draw("square"));
circleButton.addEventListener("click", () => draw("circle"));
smileyButton.addEventListener("click", () => draw("smiley"));
blurButton.addEventListener("click", () => draw("blur"));
squareOutlineButton.addEventListener("click", () => draw("squareOutline"));
circleOutlineButton.addEventListener("click", () => draw("circleOutline"));
dinosaurButton.addEventListener("click", () => draw("dinosaur"));
eraseButton.addEventListener("click", () => erase());
clearButton.addEventListener("click", () => {
    clearBoard();
    fillBoard();
});
controlButtons.forEach(button => {
    setButtonIcon(button);
    button.addEventListener("click", () => {
        setSelectedButton(controlButtons, button);
        if (button === clearButton) button.classList.remove("selected");
        if (button === dinosaurButton) setSelectedButton(colorButtons, button);
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









