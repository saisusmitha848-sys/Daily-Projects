const generateBtn = document.getElementById("generateBtn");
const colorCode = document.getElementById("colorCode");

function generateRandomColor() {

    const characters = "0123456789ABCDEF";

    let color = "#";

    for (let i = 0; i < 6; i++) {

        const randomIndex = Math.floor(
            Math.random() * 16
        );

        color += characters[randomIndex];
    }

    return color;
}

function changeColor() {

    const randomColor = generateRandomColor();

    document.body.style.backgroundColor = randomColor;

    colorCode.textContent = randomColor;
}

generateBtn.addEventListener("click", changeColor);