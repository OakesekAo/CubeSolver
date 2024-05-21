let selectedColor = 'white';

// Color selection handler
document.querySelectorAll('.color-block').forEach(el => {
    el.onclick = () => {
        selectedColor = el.id.replace('color-', '');
    };
});

// Cube face initialization with default solved state
const defaultColors = {
    'u': 'white',
    'd': 'yellow',
    'l': 'orange',
    'r': 'red',
    'f': 'green',
    'b': 'blue'
};

document.querySelectorAll('.cube-face').forEach(face => {
    const faceId = face.id.replace('-face', '');
    for (let i = 0; i < 9; i++) {
        const div = document.createElement('div');
        div.style.backgroundColor = defaultColors[faceId];
        div.dataset.color = defaultColors[faceId];
        div.onclick = () => {
            div.style.backgroundColor = selectedColor;
            div.dataset.color = selectedColor;
            logCubeState(); // Log the cube state when a color block is clicked
        };
        face.appendChild(div);
    }
});

const defaultColorMappings = {
    'white': 'u',
    'yellow': 'd',
    'orange': 'l',
    'red': 'r',
    'blue': 'b',
    'green': 'f'
};

function getCubeState() {
    const faces = {
        'u': 'up',
        'r': 'right',
        'f': 'front',
        'd': 'down',
        'l': 'left',
        'b': 'back'
    };
    const cubeState = [];

    for (const [face, faceId] of Object.entries(faces)) {
        const faceElements = document.querySelectorAll(`#${faceId}-face div`);
        faceElements.forEach(el => {
            const color = el.dataset.color || 'white';
            cubeState.push(defaultColorMappings[color]);
        });
    }
    return cubeState.join('');
}

function logCubeState() {
    const cubeStateString = getCubeState();
    console.log('Cube State:', cubeStateString);
}

// Initialize the cube to a solved state
document.addEventListener('DOMContentLoaded', (event) => {
    initializeCubeToSolvedState();
    logCubeState(); // Log initial state
});

function initializeCubeToSolvedState() {
    const solvedState = {
        'up': 'u',
        'down': 'd',
        'left': 'l',
        'right': 'r',
        'front': 'f',
        'back': 'b'
    };

    Object.keys(solvedState).forEach(faceId => {
        const faceElements = document.querySelectorAll(`#${faceId}-face div`);
        faceElements.forEach(el => {
            el.style.backgroundColor = defaultColors[faceId];
            el.dataset.color = defaultColors[faceId];
        });
    });
}

// Function to solve the cube
function solveCube() {
    const cubeStateString = getCubeState();
    console.log('Solving Cube State:', cubeStateString);

    try {
        // Assume RubiksCube is the global object provided by the rubiks-cube-solver library
        const solveMoves = rubiks-cube-solver(cubeStateString);
        console.log('Solution:', solveMoves);
        document.getElementById('solution').innerText = 'Solution: ' + solveMoves;
    } catch (error) {
        console.error('Solver failed to solve the cube:', error);
        alert('Solver failed to solve the cube. Please check the cube state.');
    }
}


