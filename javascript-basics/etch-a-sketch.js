// see https://www.theodinproject.com/lessons/foundations-etch-a-sketch

function drawGrid(gridSize) {
    const container = document.getElementById('container');

    for (let i = 0; i < gridSize; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        container.appendChild(row);

        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            row.appendChild(cell);
        }
    }
}

drawGrid(10);
