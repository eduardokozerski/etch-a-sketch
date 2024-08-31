const grid = document.querySelector('.game-grid');
const buttons = document.querySelectorAll('button');
const slider = document.querySelector('#myRange');
const sliderValue = document.querySelector('.slider-value');
const colorPicker = document.querySelector('#color-picker');
const clearBtn = document.querySelector('.clear-btn');
const eraserBtn = document.querySelector('.eraser-btn');
const rainbowBtn = document.querySelector('.rainbow-btn');
let isRainbowMode = false;
let color = 'black';
let isMouseDown = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('active');
    });
});

slider.oninput = () => {
    sliderValue.textContent = slider.value + ' x ' + slider.value;
    createGrid(slider.value);
};

colorPicker.oninput = () => {
    color = colorPicker.value;
};

document.body.onmousedown = () => {isMouseDown = true};
document.body.onmouseup = () => {isMouseDown = false};

function applyColor(square) {
    if (eraserBtn.classList.contains('active')) {
        square.style.backgroundColor = 'transparent';
    } else if(isRainbowMode) {
        square.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    } else {
        square.style.backgroundColor = color;
    }
}

function createGrid(size) {
    grid.innerHTML = ''; // Clear existing grid
    for (let row = 1; row <= size; row++) {
        let rowElement = document.createElement('div');
        rowElement.classList.add('row');
        grid.appendChild(rowElement);
        for (let column = 1; column <= size; column++) {
            let square = document.createElement('div');
            square.classList.add('square');
            square.addEventListener('mousedown', () => {
                applyColor(square);
            });

            square.addEventListener('mousemove', () => {
                if(isMouseDown === true) {
                    applyColor(square);
                }
            });

            rowElement.appendChild(square);
        };
    };
};

clearBtn.addEventListener('click', () => {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.style.backgroundColor = 'transparent';
    });
});

rainbowBtn.addEventListener('click', () => {
    isRainbowMode = !isRainbowMode;
    if(isRainbowMode) {
        rainbowBtn.classList.add('active');
    } else {
        rainbowBtn.classList.remove('active');
    }
});

createGrid(slider.value);