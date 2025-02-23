const categories = {
    fruits: ['🍎', '🍌', '🍉', '🍇', '🍓', '🍍', '🥭', '🍒'],
    emojis: ['😀', '😂', '😍', '😎', '😡', '😭', '🤯', '🥶'],
    animals: ['🐶', '🐱', '🐭', '🐹', '🦊', '🐻', '🐸', '🐼'],
    planets: ['🌍', '🌕', '🪐', '🌟', '☄️', '🌞', '🌑', '🌛'],
    flags: ['🇺🇸', '🇬🇧', '🇫🇷', '🇩🇪', '🇮🇳', '🇨🇦', '🇯🇵', '🇧🇷']
};

let selectedCategory = '';
let cardValues = [];
let flippedCards = [];
let matchedCards = [];
let score = 0;
let timer = 30;
let timerInterval;

const gameContainer = document.getElementById('game-container');
const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const gameOverScreen = document.getElementById('game-over');
const finalScoreDisplay = document.getElementById('final-score');

// Function to initialize the game
const startGame = (category) => {
    selectedCategory = category;
    cardValues = [...categories[category], ...categories[category]];
    cardValues.sort(() => Math.random() - 0.5);
    gameBoard.innerHTML = '';
    score = 0;
    timer = 30;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timer;
    gameOverScreen.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    flippedCards = [];
    matchedCards = [];
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
    
    cardValues.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.innerHTML = '?';
        card.addEventListener('click', handleCardClick);
        gameBoard.appendChild(card);
    });
};

// Function to handle card clicks
const handleCardClick = (e) => {
    const card = e.target;
    if (flippedCards.length < 2 && !card.classList.contains('flipped') && !card.classList.contains('matched')) {
        card.classList.add('flipped');
        card.innerHTML = card.dataset.value;
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 800); // Improved timing for better UX
        }
    }
};

// Function to check if two flipped cards match
const checkMatch = () => {
    const [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);
        score += 10;
        scoreDisplay.textContent = score;
        if (matchedCards.length === cardValues.length) {
            endGame(true);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.innerHTML = '?';
            card2.innerHTML = '?';
        }, 500);
    }
    flippedCards = [];
};

// Function to update the countdown timer
const updateTimer = () => {
    timer--;
    timerDisplay.textContent = timer;
    if (timer === 0) {
        endGame(false);
    }
};

// Function to end the game
const endGame = (won) => {
    clearInterval(timerInterval);
    gameContainer.classList.add('hidden');
    gameOverScreen.classList.remove('hidden');
    finalScoreDisplay.textContent = won ? `You Won! Final Score: ${score}` : `Time's up! Final Score: ${score}`;
};

// Event Listeners

document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', () => startGame(button.dataset.category));
});

document.getElementById('restart').addEventListener('click', () => startGame(selectedCategory));

document.getElementById('play-again').addEventListener('click', () => {
    document.getElementById('landing-page').classList.remove('hidden');
    gameOverScreen.classList.add('hidden');
});

document.getElementById('view-instructions').addEventListener('click', () => {
    document.getElementById('instructions').classList.remove('hidden');
});

document.getElementById('close-instructions').addEventListener('click', () => {
    document.getElementById('instructions').classList.add('hidden');
});
