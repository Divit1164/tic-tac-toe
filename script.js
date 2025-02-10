const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetBtn');
const statusDisplay = document.getElementById('status');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', '']; // Array to store game state

const checkWinner = () => {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            gameActive = false;
            statusDisplay.textContent = `${currentPlayer} wins!`;
            return;
        }
    }

    if (!gameState.includes('')) {
        gameActive = false;
        statusDisplay.textContent = 'It\'s a draw!';
    }
};

const handleCellClick = (e) => {
    const index = e.target.getAttribute('data-index');

    if (gameState[index] !== '' || !gameActive) return;

    gameState[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    checkWinner();

    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
};

const resetGame = () => {
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    statusDisplay.textContent = '';
    cells.forEach(cell => cell.textContent = '');
};

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);
