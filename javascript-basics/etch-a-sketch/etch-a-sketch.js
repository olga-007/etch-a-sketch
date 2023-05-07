// see https://www.theodinproject.com/lessons/foundations-etch-a-sketch

// TODO:
// - shades of gray mode
// - gallery

let gridSize = 50;
let isDrawing;
let drawingColor;
const MODE_CLASSIC = 'Classic';
const MODE_RAINBOW = 'Rainbow';
let mode;

function addNewElement(type, parent, cssClass) {
    const element = document.createElement(type);
    if (cssClass) {
        element.classList.add(cssClass);
    }
    parent.appendChild(element);
    return element;
}

function addNewDiv(parent, cssClass) {
    return addNewElement('div', parent, cssClass);
}

function addNewModeRadioBtn(parent, value) {
    const label = addNewElement('label', parent);

    const modeRadioBtn = addNewElement('input', label);
    modeRadioBtn.type = 'radio';
    modeRadioBtn.name = 'modes';
    modeRadioBtn.value = value;

    const description = addNewDiv(label);
    description.textContent = value;

    return modeRadioBtn;
}

function createNewColorBox(color) {
    const colorBox = document.createElement('div');
    colorBox.classList.add('colorBox');
    if (color) {
        colorBox.style.backgroundColor = color;
    }
    return colorBox;
}

const container = document.getElementById('container');
const info = addNewDiv(container, 'info');

const colorInfo = addNewDiv(info, 'colorInfo');
const colorLabel = addNewDiv(colorInfo);
const colorBoxContainer = addNewDiv(colorInfo, 'colorBoxContainer');

const classicColorBox = createNewColorBox();
const redColorBox = createNewColorBox('red');
const greenColorBox = createNewColorBox('green');
const blueColorBox = createNewColorBox('blue');

const modeSelector = addNewDiv(info, 'modeSelector');
modeSelector.textContent = 'Mode:';

const classicModeRadioBtn = addNewModeRadioBtn(modeSelector, MODE_CLASSIC);
addNewModeRadioBtn(modeSelector, MODE_RAINBOW);

const resetBtn = addNewElement('button', info);
resetBtn.innerText = 'Reset';

const changeGridBtn = addNewElement('button', info);
changeGridBtn.innerText = 'Grid Density';

const canvas = addNewDiv(container, 'canvas');

const helpText = addNewDiv(container, 'helpText');
helpText.textContent = 'Left-click on the canvas to start/stop drawing, right-click to invert the drawing color.';

function setDrawingColor(color) {
    drawingColor = color;
    classicColorBox.style.backgroundColor = color;
}

function invertDrawingColor() {
    setDrawingColor(drawingColor === 'black' ? 'white' : 'black');
}

function setDrawingStatus(status) {
    isDrawing = status;
    colorLabel.textContent = status ? 'Drawing with' : 'Click to draw with';
}

function switchToMode(newMode) {
    mode = newMode;
    if (mode === MODE_RAINBOW) {
        colorBoxContainer.replaceChildren(redColorBox, greenColorBox, blueColorBox);
    } else {
        colorBoxContainer.replaceChildren(classicColorBox);
    }
}

function draw(element) {
    if (isDrawing) {
        if (mode === MODE_RAINBOW) {
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);
            element.style.backgroundColor = `#${randomColor}`;
        } else {
            element.style.backgroundColor = drawingColor;
        }
    }
}

function drawGrid() {
    while (canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
    }
    setDrawingStatus(false);
    switchToMode(MODE_CLASSIC);
    classicModeRadioBtn.checked = true;
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

modeSelector.addEventListener('change', (e) => {
    switchToMode(e.target.value);
});

canvas.addEventListener('click', (e) => {
    setDrawingStatus(!isDrawing);
    if (e.target.classList.contains('cell')) {
        draw(e.target);
    }
});

canvas.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    if (mode !== MODE_RAINBOW) {
        invertDrawingColor();
        if (e.target.classList.contains('cell')) {
            draw(e.target);
        }
    }
});

resetBtn.addEventListener('click', drawGrid);

changeGridBtn.addEventListener('click', changeGridDensity);

drawGrid();
