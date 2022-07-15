const background = document.querySelector(".background");
const popButton = document.querySelector(".pop");
const fillButton = document.querySelector(".fill");
const resetButton = document.querySelector(".reset");
const clearButton = document.querySelector(".clear");

const rainbowColors = ["#ec87b9", "#e75ea3", "#fbbd4e", "#fdd349", 
"#8ed1b5", "#55cbcb", "#44b0c6", "757acd", "e272d5"];
const positions = ["scale(2) translateX(-20px)", "scale(2) translateX(20px)", 
        "scale(2) translateY(-20px)", "scale(2) translateY(20px)"];


fillBoard();

const balloons = document.querySelectorAll(".balloon");

function fillBoard() {
    for (let i = 0; i < 150; i++) {
        const balloon = document.createElement("div");
        balloon.classList.add("balloon");
        setRandomColor(rainbowColors, balloon);
        setRandomPosition(balloon);
        background.appendChild(balloon);
    }
}

popButton.onclick = () => {
    background.style.setProperty("cursor", "url(./images/pin.png), auto");
    balloons.forEach(balloon => {
        balloon.addEventListener("mouseover", () => {
            balloon.style.backgroundColor = "transparent";
        });
    });
}

fillButton.onclick = () => {
    background.style.setProperty("cursor", "url(./images/plus.png), auto");
    balloons.forEach(balloon => {
        balloon.addEventListener("mouseover", () => {
            setRandomColor(rainbowColors, balloon);
        })
    });
}

resetButton.onclick = () => {
    balloons.forEach(balloon => {
        balloon.style.setProperty("cursor", "auto");
        setRandomColor(rainbowColors, balloon);
        setRandomPosition(balloon);
    });
}

clearButton.onclick = () => {
    balloons.forEach(balloon => {
        balloon.style.setProperty("cursor", "auto");
        balloon.style.backgroundColor = "transparent";
    });
}

function setRandomColor(colors, balloon) {
    let randomColor = Math.floor(Math.random() * (colors.length - 2));
    balloon.style.backgroundColor = colors[randomColor];
}

function setRandomPosition(balloon) {
    let randomPosition = Math.floor(Math.random() * (positions.length - 2));
    balloon.style.transform = positions[randomPosition];
}

// Doesn't work
function resetMouseover() {
    balloons.forEach(balloon => {
        balloon.removeEventListener("mouseover", setRandomColor)
    });
}

