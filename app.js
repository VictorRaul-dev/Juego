// Referencia de la sección de juegos y el menú principal
const gameSection = document.getElementById('game-section');
const memoryGame = document.getElementById('memory-game');
const memoryGrid = document.getElementById('memory-grid');

// Contenedor para el mensaje de felicitación
const congratulationMessage = document.createElement('div');
congratulationMessage.classList.add('congratulation-message', 'hidden');
congratulationMessage.innerHTML = `
    <h2>Felicitaciones! Has encontrado todas sus parejas!</h2>
    <button onclick="startMemoryGame()">Jugar de nuevo</button>
    <button onclick="goBack()">Regresar al Menu</button>
`;
gameSection.appendChild(congratulationMessage);
 
// Función para iniciar el juego de memoria
function startMemoryGame() {
    // Muestra la sección de juego y oculta el menú principal
    gameSection.classList.remove('hidden');
    memoryGame.classList.remove('hidden');
    congratulationMessage.classList.add('hidden');
    document.querySelector('.game-menu').classList.add('hidden');
    setupMemoryGame();
}

// Función para volver al menú principal
function goBack() {
    gameSection.classList.add('hidden');
    memoryGame.classList.add('hidden');
    congratulationMessage.classList.add('hidden');
    document.querySelector('.game-menu').classList.remove('hidden');
}

// Setup básico del juego de memoria
function setupMemoryGame() {
    const cards = [
        './images/ig1.jpg', './images/ig1.jpg',
        './images/ig2.jpg', './images/ig2.jpg',
        './images/ig3.jpg', './images/ig3.jpg',
        './images/ig4.jpg', './images/ig4.jpg'
    ];

    const shuffledCards = cards.sort(() => 0.5 - Math.random());
    memoryGrid.innerHTML = ''; // Limpia el tablero

    shuffledCards.forEach((imgSrc) => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.image = imgSrc;

        const img = document.createElement('img');
        img.src = imgSrc;
        img.classList.add('card-image');
        card.appendChild(img);

        card.addEventListener('click', flipCard);
        memoryGrid.appendChild(card);
    });

    // Reinicia el conteo de parejas encontradas
    matchedPairs = 0;
}

let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;
let matchedPairs = 0; // Contador de parejas encontradas

// Función para voltear la carta
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return; // Evita que la misma carta se seleccione dos veces

    this.classList.add('flipped');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    hasFlippedCard = false;
    secondCard = this;

    checkForMatch();
}

// Verificar si las cartas coinciden
function checkForMatch() {
    if (firstCard.dataset.image === secondCard.dataset.image) {
        disableCards();
        matchedPairs++;
        if (matchedPairs === 4) { // Si se han encontrado las 4 parejas
            showCongratulations();
        }
    } else {
        unflipCards();
    }
}

// Deshabilita las cartas si coinciden
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

// Voltea las cartas nuevamente si no coinciden
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

// Restablece el tablero para la siguiente jugada
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Muestra el mensaje de felicitación al terminar el juego
function showCongratulations() {
    congratulationMessage.classList.remove('hidden');
    memoryGame.classList.add('hidden');
}
