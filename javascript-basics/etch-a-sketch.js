// see https://www.theodinproject.com/lessons/foundations-etch-a-sketch

let isDrawing = false;
let currentColor = 'black';

function draw() {
    if (isDrawing) {
        this.style.backgroundColor = currentColor;
    }
}

const container = document.getElementById('container');

container.addEventListener('click', () => {
    isDrawing = !isDrawing;
});

container.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    currentColor = currentColor === 'black' ? 'white' : 'black';
});

function drawGrid(gridSize) {
    for (let i = 0; i < gridSize; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        container.appendChild(row);

        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.addEventListener('mouseover', draw);
            row.appendChild(cell);
        }
    }
}

drawGrid(50);
