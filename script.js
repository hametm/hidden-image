const background = document.querySelector(".background");
const eraseButton = document.querySelector(".erase");
const fillButton = document.querySelector(".fill");
const resetButton = document.querySelector(".reset");
const clearButton = document.querySelector(".clear");
const cursorButton = document.querySelector(".cursor");

const rainbowColors = ["#ec87b9", "#e75ea3", "#fbbd4e", "#fdd349", 
"#8ed1b5", "#55cbcb", "#44b0c6", "757acd", "e272d5"];
const positions = ["scale(2) translateX(-20px)", "scale(2) translateX(20px)", 
        "scale(2) translateY(-20px)", "scale(2) translateY(20px)"];


fillBoard();

const squares = document.querySelectorAll(".square");


function fillBoard() {
    for (let i = 0; i < 150; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        setRandomColor(rainbowColors, square);
        setRandomPosition(square);
        background.appendChild(square);
    }
}

eraseButton.onclick = () => {
    squares.forEach(square => {
        square.addEventListener("mouseover", () => {
            square.style.backgroundColor = "transparent";
        })
    });
}

fillButton.onclick = () => {
    squares.forEach(square => {
        square.addEventListener("mouseover", () => {
            setRandomColor(rainbowColors, square);
        })
    });
}

resetButton.onclick = () => {
    squares.forEach(square => {
        setRandomColor(rainbowColors, square);
        setRandomPosition(square);
    });
}

clearButton.onclick = () => {
    squares.forEach(square => {
        square.style.backgroundColor = "transparent";
    });
}

cursorButton.onclick = () => {
    
}

function setRandomColor(colors, square) {
    let randomColor = Math.floor(Math.random() * (colors.length - 2));
    square.style.backgroundColor = colors[randomColor];
}

function setRandomPosition(square) {
    let randomPosition = Math.floor(Math.random() * (positions.length - 2));
    square.style.transform = positions[randomPosition];
}





