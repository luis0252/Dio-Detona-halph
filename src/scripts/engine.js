const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelectorAll(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    Values: {
        timerId: null,
        countDownTimerId: setInterval(countDown, 1000),
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },
};

function countDown() {
    state.Values.currentTime--;
    state.view.timeLeft.textContent = state.Values.currentTime;

    if (state.Values.currentTime <= 0) {
        clearInterval(state.Values.countDownTimerId);
        clearInterval(state.Values.timerId);
        alert("Game Over! O seu resultado foi: " + state.Values.result);        
    }
}

function playSouns() {
    let audio = new Audio("./src/audios/hit.m4a");
    audio.play();
    audio.volume = 0.2;
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.Values.hitPosition = randomSquare.id
}

function moveEnemy() {
    state.Values.timerId = setInterval(randomSquare, state.Values.gameVelocity)
}

function addListenerHitbox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.Values.hitPosition) {
                state.Values.result++;
                state.view.score.textContent = state.Values.result;
                state.Values.hitPosition = null;
                playSouns()

            }
        })
    });
}

function initialize() {
    moveEnemy();
    addListenerHitbox();
}

initialize();