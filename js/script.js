const colours = ['#f67e7d', '#f39c12', '#2ecc71', '#b4ffd4', '#ffc6fe', '#1abc9c', '#e67e22', '#8e8dbe'];
let shuffledColours = [...colours, ...colours];
let flippedTiles = [];
let matchedTiles = [];
let moveCount = 0;
const flipDelay = 600;

const moveCountDisplay = document.getElementById('moveCount');

function updateMoveCountDisplay() {
    moveCountDisplay.textContent = moveCount;
}

const gameContainer = document.getElementById('container');
const gameWonMessage = document.getElementById('gameWonMessage');

shuffledColours.sort(() => Math.random() - 0.5);

shuffledColours.forEach((colour, index) => {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.setAttribute('data-index', index);

    const tileValue = document.createElement('div');
    tileValue.classList.add('tile-value');
    tileValue.style.backgroundColor = colour;

    tile.appendChild(tileValue);
    gameContainer.appendChild(tile);

    tile.addEventListener('click', () => flipTile(tile));
});

function flipTile(tile) {
    if (flippedTiles.length < 2 && !tile.classList.contains('flipped') && !tile.classList.contains('matched') && !flippedTiles.includes(tile)) {
        tile.classList.add('flipped');
        flippedTiles.push(tile);

        if (flippedTiles.length === 2) {
            moveCount++;
            updateMoveCountDisplay();

            const [tile1, tile2] = flippedTiles;
            const colour1 = tile1.querySelector('.tile-value').style.backgroundColor;
            const colour2 = tile2.querySelector('.tile-value').style.backgroundColor;

            if (colour1 === colour2) {
                tile1.classList.add('matched');
                tile2.classList.add('matched');
                matchedTiles.push(tile1, tile2);
                flippedTiles = [];

                if (matchedTiles.length === shuffledColours.length) {
                    gameOver();
                }
            } else {
                setTimeout(() => {
                    tile1.classList.remove('flipped');
                    tile2.classList.remove('flipped');
                    flippedTiles = [];
                }, flipDelay);
            }
        }
    }
}

function gameOver() {
    gameWonMessage.style.display = 'block';
}