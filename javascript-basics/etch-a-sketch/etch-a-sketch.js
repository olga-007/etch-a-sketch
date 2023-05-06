// see https://www.theodinproject.com/lessons/foundations-etch-a-sketch

const gridSize = 50;
let isDrawing;
let drawingColor;

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
const colorBox = addNewDiv(colorInfo, 'colorBox');

const resetBtn = document.createElement('button');
resetBtn.innerText = 'Reset';
info.appendChild(resetBtn);

const canvas = addNewDiv(container, 'canvas');

function setDrawingColor(color) {
    drawingColor = color;
    colorBox.style.backgroundColor = color;
}

function invertDrawingColor() {
    setDrawingColor(drawingColor === 'black' ? 'white' : 'black');
}

function setDrawingStatus(status) {
    isDrawing = status;
    colorLabel.textContent = status ? 'Drawing with' : 'Ready to draw with';
}

function draw() {
    if (isDrawing) {
        this.style.backgroundColor = drawingColor;
    }
}

function drawGrid() {
    while (canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
    }
    setDrawingStatus(false);
    setDrawingColor('black');

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
    setDrawingStatus(!isDrawing);
});

canvas.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    invertDrawingColor();
});

drawGrid();
