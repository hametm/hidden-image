const background = document.querySelector(".background");
const popButton = document.querySelector(".pop");
const fillButton = document.querySelector(".fill");
const resetButton = document.querySelector(".reset");
const clearButton = document.querySelector(".clear");

const rainbowColors = ["#ec87b9", "#e75ea3", "#fbbd4e", "#fdd349", 
"#8ed1b5", "#55cbcb", "#44b0c6", "757acd", "e272d5"];
const positions = ["scale(2) translateX(-20px)", "scale(2) translateX(20px)", 
        "scale(2) translateY(-20px)", "scale(2) translateY(20px)"];
const images = ["giraffe", "loch-ness-monster", "torii", "poseidon", "gandalf", "dragon-fruit"];


fillBoard();


function fillBoard() {
    for (let i = 0; i < 150; i++) {
        const balloon = document.createElement("div");
        balloon.classList.add("balloon");
        getColor(rainbowColors, balloon);
        getPosition(balloon);
        background.appendChild(balloon);
    }
    getImage();
}

popButton.onclick = () => {
    const balloons = document.querySelectorAll(".balloon");
    // background.style.setProperty("cursor", "url(./images/pin.png), auto");
    balloons.forEach(balloon => {
        balloon.addEventListener("mouseover", () => {
            balloon.style.backgroundColor = "transparent";
            balloon.style.transform = "scale(.5)";
        });
    });
}

fillButton.onclick = () => {
    // background.style.setProperty("cursor", "url(./images/plus.png), auto");
    let balloonsExist = document.querySelector(".balloon");
    if (balloonsExist) {
        const balloons = document.querySelectorAll(".balloon");
        balloons.forEach(balloon => {
            balloon.addEventListener("mouseover", () => {
                balloon.style.transform = "scale(2)";
                getPosition(balloon);
                getColor(rainbowColors, balloon);
            })
        });
    } else {
        for (let i = 0; i < 150; i++) {
            const balloon = document.createElement("div");
            balloon.classList.add("balloon");
            balloon.style.backgroundColor = "transparent";
            balloon.addEventListener("mouseover", () => {
                getColor(rainbowColors, balloon);
            });
            getPosition(balloon);
            background.appendChild(balloon);
        }
    }
}

resetButton.onclick = () => {
    clearBoard();
    fillBoard();
}

clearButton.onclick = () => {
    clearBoard();
}

function getColor(colors, balloon) {
    let randomColor = Math.floor(Math.random() * (colors.length - 1));
    balloon.style.backgroundColor = colors[randomColor];
}

function getPosition(balloon) {
    let randomPosition = Math.floor(Math.random() * (positions.length));
    balloon.style.transform = positions[randomPosition];
}

function getImage() {
    let randomImage = Math.floor(Math.random() * (images.length));
    image = images[randomImage];
    background.style.backgroundImage = `url(./images/${image}.png)`;
}

function clearBoard() {
    const balloons = document.querySelectorAll(".balloon");
    balloons.forEach(balloon => {
        balloon.remove();
    });
}

