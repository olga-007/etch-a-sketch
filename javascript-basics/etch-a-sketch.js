// see https://www.theodinproject.com/lessons/foundations-etch-a-sketch

const gridSize = 50;
let isDrawing = false;
let currentColor = 'black';

function addNewDiv(parent, cssClass) {
    const element = document.createElement('div');
    if (cssClass) {
        element.classList.add(cssClass);
    }
    parent.appendChild(element);
    return element;
}

const container = document.getElementById('container');
const info = addNewDiv(container, 'info');

const colorInfo = addNewDiv(info, 'colorInfo');
const colorLabel = addNewDiv(colorInfo, 'colorLabel');
colorLabel.textContent = 'Drawing with';
const colorBox = addNewDiv(colorInfo, 'colorBox');

const resetBtn = document.createElement('button');
resetBtn.innerText = 'Reset';
resetBtn.classList.add('button');
info.appendChild(resetBtn);

const canvas = addNewDiv(container, 'canvas');

function setCurrentColor(color) {
    currentColor = color;
    colorBox.style.backgroundColor = color;
}

function draw() {
    if (isDrawing) {
        this.style.backgroundColor = currentColor;
    }
}

function drawGrid() {
    while (canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
    }
    isDrawing = false;
    setCurrentColor('black');

    for (let i = 0; i < gridSize; i++) {
        const row = addNewDiv(canvas, 'row');

        for (let j = 0; j < gridSize; j++) {
            const cell = addNewDiv(row, 'cell');
            cell.addEventListener('mouseover', draw);
        }
    }
}

resetBtn.addEventListener('click', drawGrid);

canvas.addEventListener('click', () => {
    isDrawing = !isDrawing;
});

canvas.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    setCurrentColor(currentColor === 'black' ? 'white' : 'black');
});

drawGrid();
