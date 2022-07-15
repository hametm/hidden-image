const background = document.querySelector(".background");
const popButton = document.querySelector(".pop");
const fillButton = document.querySelector(".fill");
const resetButton = document.querySelector(".reset");
const clearButton = document.querySelector(".clear");

const rainbowButton = document.querySelector(".rainbow");
const oceanButton = document.querySelector(".ocean");
const hogwartsButton = document.querySelector(".hogwarts");
const bowieButton = document.querySelector(".bowie");
const peachesButton = document.querySelector(".peaches");
const colorButtons = document.querySelectorAll(".colors");


const rainbowColors = ["#ec87b9", "#e75ea3", "#fbbd4e", "#fdd349", 
        "#8ed1b5", "#55cbcb", "#44b0c6", "757acd", "e272d5"];
const oceanColors = ["#093862", "#0960a3", "#54a7d9", "#a9dafb", "#7bafba", "#3f999a", "#1e7c96"];
const peachColors = ["#f8bb51", "#f99827", "#f3d5af", "#f6bf87", "#f0631e", "#f7865e"];
const bowieColors = ["#f2ddd8", "#e83d05", "#b90005", "#39b2ba", "#030639"];
const hogwartsColors = ["#ae0001", "#2a623d", "#222f5b", "#f0c75e"];
const positions = ["scale(2) translateX(-20px)", "scale(2) translateX(20px)", 
        "scale(2) translateY(-20px)", "scale(2) translateY(20px)"];
const images = ["giraffe", "loch-ness-monster", "torii", "poseidon", "gandalf", "dragon-fruit"];

let colorScheme = rainbowColors;


fillBoard();

function fillBoard() {
    for (let i = 0; i < 150; i++) {
        const balloon = document.createElement("div");
        balloon.classList.add("balloon");
        getColor(colorScheme, balloon);
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
                getColor(colorScheme, balloon);
            })
        });
    } else {
        for (let i = 0; i < 150; i++) {
            const balloon = document.createElement("div");
            balloon.classList.add("balloon");
            balloon.style.backgroundColor = "transparent";
            balloon.addEventListener("mouseover", () => {
                getColor(colorScheme, balloon);
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
    let randomColor = Math.floor(Math.random() * (colors.length));
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

rainbowButton.addEventListener("click", () => colorScheme = rainbowColors);
oceanButton.addEventListener("click", () => colorScheme = oceanColors);
hogwartsButton.addEventListener("click", () => colorScheme = hogwartsColors);
bowieButton.addEventListener("click", () => colorScheme = bowieColors);
peachesButton.addEventListener("click", () => colorScheme = peachColors);

rainbowButton.classList.add("selected"); // Set default color scheme

colorButtons.forEach(button => {
    button.onclick = () => {
        colorButtons.forEach(button => {
            button.classList.remove("selected");
        });
        button.classList.add("selected");
    }
});




