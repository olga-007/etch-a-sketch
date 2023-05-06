// see https://www.theodinproject.com/lessons/foundations-etch-a-sketch

// TODO:
// - rainbow mode
// - shades of gray mode
// - gallery

let gridSize = 50;
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

const changeGridBtn = document.createElement('button');
changeGridBtn.innerText = 'Grid Density';
info.appendChild(changeGridBtn);

const canvas = addNewDiv(container, 'canvas');

const helpText = addNewDiv(container, 'helpText');
helpText.textContent = 'Left-click on the canvas to start/stop drawing, right-click to invert the drawing color.';

function setDrawingColor(color) {
    drawingColor = color;
    colorBox.style.backgroundColor = color;
}

function invertDrawingColor() {
    setDrawingColor(drawingColor === 'black' ? 'white' : 'black');
}

function setDrawingStatus(status) {
    isDrawing = status;
    colorLabel.textContent = status ? 'Drawing with' : 'Click the canvas to draw with';
}

function draw(element) {
    if (isDrawing) {
        element.style.backgroundColor = drawingColor;
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
            cell.addEventListener('mouseover', (e) => draw(e.currentTarget));
        }
    }
}

function changeGridDensity() {
    const min = 4;
    const max = 64;
    let newGridSize;
    let isValidGridSize;

    do {
        // eslint-disable-next-line no-alert
        const value = prompt(`Enter a number between ${min} and ${max}`, gridSize);
        if (value === null) {
            break; // cancel
        }
        newGridSize = +value;
        isValidGridSize = !Number.isNaN(newGridSize) && newGridSize >= min && newGridSize <= max;
    } while (!isValidGridSize);

    if (isValidGridSize) {
        gridSize = newGridSize;
        drawGrid();
    }
}

canvas.addEventListener('click', (e) => {
    setDrawingStatus(!isDrawing);
    if (e.target.classList.contains('cell')) {
        draw(e.target);
    }
});

canvas.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    invertDrawingColor();
    if (e.target.classList.contains('cell')) {
        draw(e.target);
    }
});

resetBtn.addEventListener('click', drawGrid);

changeGridBtn.addEventListener('click', changeGridDensity);

drawGrid();
