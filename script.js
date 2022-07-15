const background = document.querySelector(".background");

for (let i = 0; i < 150; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    background.appendChild(square);

    square.addEventListener("mouseover", () => {
        square.classList.add("transparent");
    });
}