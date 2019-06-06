let moleTimeouts = [];
let score = 0;
let highScore = 0;
let gameTime = 30;
let lengthInterval;

/** Create our own forEach (for loop w/ callback) */
function forLoop(iterative, callback) {
    for(let i = 0; i < iterative.length; i++) {
        callback(iterative[i]);
    }
}

/** Gets milliseconds based on a ceiling */
function getMilliseconds(ceiling) {
    return Math.random() * ceiling * 1000;
}

/** Hides a mole */
function hideMole(mole) {
    const timeout = getMilliseconds(3) + 1000;
    moleTimeouts.push(setTimeout(function () {
        // Remove class to hide the mole
        mole.classList.remove('-up');
        showMole(mole);
    }, timeout));
}

/** Shows a mole */
function showMole(mole) {
    const timeInterval = getMilliseconds(10);
    moleTimeouts.push(setTimeout(function () {
        // Add class to show the mole
        mole.classList.add('-up');
        hideMole(mole);
    }, timeInterval));
}

/** Updates the current score in the DOM */
function updateHighScore() {
    if (score > highScore) {
        highScore = score;
        document.getElementById('high-score').innerHTML = highScore;
    }
}

/** Sets the current score */
function setCurrentScore(currentScore) {
    document.getElementById('current-score').innerHTML = currentScore;
}

/** Updates the current score in the DOM */
function updateCurrentScore() {
    score += 100;
    updateHighScore();
    setCurrentScore(score);
}

/** Handles a mole click by hiding the mole and updating the score */
function handleMoleClick(event) {
    event.target.classList.remove('-up');
    updateCurrentScore();
}

/** Set count down time */
function setCountdown(countdown) {
    document.getElementById('time').innerHTML = countdown;
}

/** Updates the timer count down */
function updateCountdown() {
    gameTime--;
    setCountdown(gameTime);
    // If time is up, at 0
    if (!gameTime) {
        setCountdown("Time's up!");
        clearInterval(lengthInterval);
        handleStopGame();
    }
}

/** Handles the click of the start button and begins the game */
function handleStartGame() {
    // Hide welcome screen
    document.getElementById('welcome-screen').classList.add('-hidden');
    // Show game
    document.getElementById('game').classList.remove('-hidden');
    const moles = document.querySelectorAll('.mole');
    // Game length timer
    lengthInterval = setInterval(updateCountdown, 1000);
    // Add intervals and click events for each mole
    forLoop(moles, function (mole) {
        mole.addEventListener('click', handleMoleClick);
        showMole(mole);
    });
    // Disabled start button
    document.getElementById('start-button').disabled = 'true';
}

/** Stops the game in motion */
function handleStopGame() {
    // Clear all timeouts
    forLoop(moleTimeouts, function (timeout) { clearTimeout(timeout) });
    clearInterval(lengthInterval);
}

/** Resets the game to starting point */
function handleResetGame() {
    const moles = document.querySelectorAll('.mole');
    forLoop(moles, function (mole) { mole.classList.remove('-up') });
    clearInterval(lengthInterval);
    handleStopGame();
    gameTime = 30;
    score = 0;
    setCurrentScore(score);
    setCountdown(gameTime);
    document.getElementById('start-button').removeAttribute('disabled');
}