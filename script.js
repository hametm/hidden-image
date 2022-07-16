const background = document.querySelector(".background");
const backgroundContainer = document.querySelector(".background-container");
const result = document.querySelector(".result");
const eraseButton = document.querySelector(".erase");
const drawButton = document.querySelector(".draw");
const secretButton = document.querySelector(".secret");
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
const images = ["giraffe", "loch-ness-monster", "torii", "poseidon", "gandalf", "dragon-fruit"];

// Set defaults
let image = "";
let shape = "square";
let colorChoice = "green";
drawButton.classList.add("selected");
squareButton.classList.add("selected");

fillBoard();
draw();

function fillBoard() {
    for (let i = 0; i < 150; i++) {
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
            getColor(colorChoice, tile);
            getPosition(tile);
            getShape(tile);
        });
    });
}

function findHiddenImage() {
    const tiles = document.querySelectorAll(".tile");
    tiles.forEach(tile => {
        tile.addEventListener("mouseover", () => {
            tile.style.backgroundColor = "transparent";
        });
    });
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

function getImage() {
    let randomImage = Math.floor(Math.random() * (images.length));
    image = images[randomImage];
    background.style.backgroundImage = `url(./images/${image}.png)`;
}

function clearBoard() {
    backgroundContainer.style.setProperty("cursor", "auto");
    background.style.backgroundImage = "none";
    result.textContent = "";
    const tiles = document.querySelectorAll(".tile");
    tiles.forEach(tile => {
        tile.remove();
    });
}

function getResultText() {
    switch(image) {
        case "giraffe":
            result.textContent = "It's a giraffe!";
            break;
        case "loch-ness-monster":
            result.textContent = "It's the Loch Ness Monster!";
            break;
        case "torii":
            result.textContent = "It's a Shinto shrine!";
            break;
        case "poseidon":
            result.textContent = "It's King Neptune!";
            break;
        case "gandalf":
            result.textContent = "It's Gandalf the Grey!";
            break;
        case "dragon-fruit":
            result.textContent = "It's a dragonfruit!";
            break;
        default:
            result.textContent = "I don't know what it is!"
    }
}

function resetSelected(buttons, button) {
    buttons.forEach(button => {
        button.classList.remove("selected");
    });
    button.classList.add("selected");
}

eraseButton.addEventListener("click", () => {
    erase();
});

drawButton.addEventListener("click", () => {
    draw();
});
    
secretButton.addEventListener("click", () => {
    shape = "square";
    squareButton.classList.add("selected");
    circleButton.classList.remove("selected");
    clearBoard();
    fillBoard();
    getImage();
    getResultText();
    findHiddenImage();
});

clearButton.addEventListener("click", () => {
    clearBoard();
    fillBoard();
});

rainbowButton.addEventListener("click", () => colorChoice = rainbow);
blackButton.addEventListener("click", () => colorChoice = "black");
redButton.addEventListener("click", () => colorChoice = "red");
yellowButton.addEventListener("click", () => colorChoice = "yellow");
blueButton.addEventListener("click", () => colorChoice = "blue");
greenButton.addEventListener("click", () => colorChoice = "green");

drawButton.classList.add("selected") // Set default control button
greenButton.classList.add("selected"); // Set default color scheme

colorButtons.forEach(button => {
    button.addEventListener("click", () => {
        resetSelected(colorButtons, button);
        resetSelected(controlButtons, drawButton);
        draw();
    });
});

controlButtons.forEach(button => {
    button.addEventListener("click", () => {
        resetSelected(controlButtons, button);
        if (button === clearButton) button.classList.remove("selected");
    });
});

shapeButtons.forEach(button => {
    button.addEventListener("click", () => {
        resetSelected(shapeButtons, button);
        resetSelected(controlButtons, drawButton);
        draw();
    })
});

squareButton.addEventListener("click", () => shape = "square");
circleButton.addEventListener("click", () => shape = "circle");
smileyButton.addEventListener("click", () => shape = "smiley");
