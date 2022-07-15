const background = document.querySelector(".background");
const showButton = document.querySelector(".show");
const hideButton = document.querySelector(".hide");

for (let i = 0; i < 150; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    background.appendChild(square);
}

showButton.onclick = () => {
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => {
        square.addEventListener("mouseover", () => {
            square.style.backgroundColor = "transparent";
        })
    });
}

hideButton.onclick = () => {
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => {
        square.addEventListener("mouseover", () => {
            changeToRainbow(square);
        })
    });
}

function changeToRainbow(square) {
    let rainbowColors = ["red", "blue", "orange", "purple", "green", "yellow"];
    setRandomColor(rainbowColors, square);
}

function setRandomColor(colors, square) {
    currentIndex = colors.indexOf(square.style.backgroundColor);
    let randomColor = Math.floor(Math.random() * colors.length);
    square.style.backgroundColor = colors[randomColor];
}





