const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartButton = document.getElementById('restart');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => cell.addEventListener('click', cellClicked));
restartButton.addEventListener('click', restartGame);

function cellClicked() {
    const cellIndex = this.getAttribute('data-index');
    if (gameState[cellIndex] !== '' || checkWin()) {
        return;
    }
    updateCell(this, cellIndex);
    if (checkWin()) {
        statusText.textContent = `${currentPlayer} wins!`;
    } else if (!gameState.includes('')) {
        statusText.textContent = 'Draw!';
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `It's ${currentPlayer}'s turn`;
    }
}

function updateCell(cell, index) {
    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function checkWin() {
    return winConditions.some(condition => {
        return condition.every(index => gameState[index] === currentPlayer);
    });
}

function restartGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    statusText.textContent = `It's ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = '');
}

// Initialize status text
statusText.textContent = `It's ${currentPlayer}'s turn`;
