// see https://www.theodinproject.com/lessons/foundations-etch-a-sketch

const gridSize = 50;
let isDrawing = false;
let currentColor = 'black';

function draw() {
    if (isDrawing) {
        this.style.backgroundColor = currentColor;
    }
}

function addNewDiv(parent, cssClass) {
    const element = document.createElement('div');
    element.classList.add(cssClass);
    parent.appendChild(element);
    return element;
}

const container = document.getElementById('container');
const info = addNewDiv(container, 'info');
const canvas = addNewDiv(container, 'canvas');

canvas.addEventListener('click', () => {
    isDrawing = !isDrawing;
});

canvas.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    currentColor = currentColor === 'black' ? 'white' : 'black';
});

function drawGrid() {
    while (canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
    }

    for (let i = 0; i < gridSize; i++) {
        const row = addNewDiv(canvas, 'row');

        for (let j = 0; j < gridSize; j++) {
            const cell = addNewDiv(row, 'cell');
            cell.addEventListener('mouseover', draw);
        }
    }
}

const resetBtn = document.createElement('button');
resetBtn.innerText = 'Reset';
resetBtn.classList.add('button');
resetBtn.addEventListener('click', drawGrid);
info.appendChild(resetBtn);

drawGrid();
