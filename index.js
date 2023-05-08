// see https://www.theodinproject.com/lessons/foundations-etch-a-sketch

const MODE_CLASSIC = 'Classic';
const MODE_SHADES = 'Shades';
const MODE_RAINBOW = 'Rainbow';
const COLOR_BLACK = 'rgb(0, 0, 0)';
const COLOR_WHITE = 'rgb(255, 255, 255)';
const SHADE_STEP = 0.2;

let gridSize = 50;
let mode = MODE_CLASSIC;
let isDrawing;
let drawingColor;
let isInverted;

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
colorBoxContainer.appendChild(classicColorBox);

const redColorBox = createNewColorBox('red');
const greenColorBox = createNewColorBox('green');
const blueColorBox = createNewColorBox('blue');

const modeSelector = addNewDiv(info, 'modeSelector');
modeSelector.textContent = 'Mode:';

const classicModeRadioBtn = addNewModeRadioBtn(modeSelector, MODE_CLASSIC);
classicModeRadioBtn.checked = true;
addNewModeRadioBtn(modeSelector, MODE_SHADES);
addNewModeRadioBtn(modeSelector, MODE_RAINBOW);

const resetBtn = addNewElement('button', info);
resetBtn.innerText = 'Reset';

const changeGridBtn = addNewElement('button', info);
changeGridBtn.innerText = 'Grid Density';

const canvas = addNewDiv(container, 'canvas');

const helpText = addNewDiv(container, 'helpText');
helpText.textContent = 'Left-click on the canvas to start/stop drawing, right-click to invert the drawing color.';

const gallery = addNewDiv(container, 'gallery');
const galleryLink = addNewElement('a', gallery);
galleryLink.textContent = 'Go to the gallery';
galleryLink.href = './gallery/index.html';

function setDrawingInverted(inverted) {
    isInverted = inverted;
    drawingColor = isInverted ? COLOR_WHITE : COLOR_BLACK;
    classicColorBox.style.backgroundColor = drawingColor;
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

function parseRGB(rgbStr) {
    return rgbStr.slice(rgbStr.indexOf('(') + 1, rgbStr.indexOf(')')).split(',');
}

function isShadeOfBlack(rgb) {
    const r = +rgb[0];
    const g = +rgb[1];
    const b = +rgb[2];
    return !(r || g || b);
}

function darken(element) {
    const currentColor = element.style.backgroundColor;

    if (COLOR_BLACK === currentColor) {
        return;
    }

    if (!currentColor || COLOR_WHITE === currentColor) {
        element.style.backgroundColor = `rgba(0, 0, 0, ${SHADE_STEP})`;
        return;
    }

    const rgb = parseRGB(currentColor);

    if (isShadeOfBlack(rgb)) {
        rgb[3] = +rgb[3] + SHADE_STEP;
        if (rgb[3] >= 1) {
            element.style.backgroundColor = COLOR_BLACK;
        } else {
            element.style.backgroundColor = `rgba(${rgb.join(',')})`;
        }
    }
}

function lighten(element) {
    const currentColor = element.style.backgroundColor;

    if (!currentColor || COLOR_WHITE === currentColor) {
        return;
    }

    if (COLOR_BLACK === currentColor) {
        element.style.backgroundColor = `rgba(0, 0, 0, ${1 - SHADE_STEP})`;
        return;
    }

    const rgb = parseRGB(currentColor);

    if (isShadeOfBlack(rgb)) {
        rgb[3] = +rgb[3] - SHADE_STEP;
        if (rgb[3] <= 0) {
            element.style.backgroundColor = COLOR_WHITE;
        } else {
            element.style.backgroundColor = `rgba(${rgb.join(',')})`;
        }
    }
}

function draw(element) {
    if (isDrawing) {
        if (mode === MODE_RAINBOW) {
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);
            element.style.backgroundColor = `#${randomColor}`;
        } else if (mode === MODE_SHADES) {
            if (!isInverted) {
                darken(element);
            } else {
                lighten(element);
            }
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
    setDrawingInverted(false);

    for (let i = 0; i < gridSize; i++) {
        const row = addNewDiv(canvas, 'row');

        for (let j = 0; j < gridSize; j++) {
            addNewDiv(row, 'cell');
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

function drawIfCell(element) {
    if (element.classList.contains('cell')) {
        draw(element);
    }
}

modeSelector.addEventListener('change', (e) => {
    switchToMode(e.target.value);
});

canvas.addEventListener('mouseover', (e) => {
    drawIfCell(e.target);
});

canvas.addEventListener('click', (e) => {
    setDrawingStatus(!isDrawing);
    drawIfCell(e.target);
});

canvas.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    if (mode !== MODE_RAINBOW) {
        setDrawingInverted(!isInverted);
        drawIfCell(e.target);
    }
});

resetBtn.addEventListener('click', drawGrid);

changeGridBtn.addEventListener('click', changeGridDensity);

drawGrid();
