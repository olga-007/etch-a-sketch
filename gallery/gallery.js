const container = document.getElementById('container');

for (let i = 1; i < 11; i++) {
    const frame = document.createElement('div');
    frame.classList.add('frame');
    container.appendChild(frame);

    const img = document.createElement('img');
    img.src = `../images/etch-a-sketch-drawing${i}.png`;
    frame.appendChild(img);
}
