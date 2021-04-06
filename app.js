let app = {
    // Properties
    timerInterval: null,
    score: 0,
    scoreSpan: document.querySelector('#score span'),
    nbFood: null,
    speed: 200,
    timer: {
        'minutes': 0,
        'seconds': 0,
    },
    timerSpan: document.querySelector('#timer span'),
    endMessage: document.getElementById('endMessage'),
    startButton: document.getElementById('start'),

    // TODO améliorer le design
    // TODO gérer plusieurs fantômes
    // TODO ---/!\---- DOCUMENTER LES FONCTIONS ---/!\----

    // Methods
    init: () => {
        boardApp.init();
        ghostsApp.init();
        pacmanApp.init();
        app.updateNbFood();
        app.startButton = document.getElementById('start');
        app.startButton.addEventListener('click', app.start)
    },

    /**
     * Update score and display
     * @param {Number} nb number of points to add
     */
    updateScore: (nb) => {
        app.score += nb;
        app.scoreSpan.textContent = app.score;
    },

    /**
     * Update timer values and display them
     */
    updateTimer: () => {
        if (app.timer.seconds < 59) {
            app.timer.seconds++;
        } else {
            app.timer.seconds = 0;
            app.timer.minutes++;
        }
        if (app.timer.seconds < 10) {
            app.timerSpan.textContent = app.timer.minutes + ':0' + app.timer.seconds;
        } else {
            app.timerSpan.textContent = app.timer.minutes + ':' + app.timer.seconds;
        }
    },

    /**
     * Update app property nbFood to eventually display the win message
     */
    updateNbFood: () => {
        app.nbFood = Object.keys(document.querySelectorAll('.food')).length;
        if (app.nbFood === 0) {
            app.clearAllIntervals();
            app.displayEndMessage('win');
        }
    },

    /**
     * Display an end of game message
     * 
     * @param {String} winOrLoose 'win' or 'loose'
     */
    displayEndMessage: (winOrLoose) => {
        app.endMessage.innerHTML = '';
        app.endMessage.classList.remove('d-none'); // display message

        if (winOrLoose === 'win') { // create a win message
            let firstP = document.createElement('p');
            firstP.textContent = 'Vous avez';
            let secondP = document.createElement('p');
            secondP.textContent = 'GAGN\u00C9';
            let thirdP = document.createElement('p');
            thirdP.textContent = '!!!';
            app.endMessage.prepend(firstP, secondP, thirdP);
        } else {// create a game over message
            let gameOver = document.createElement('p');
            gameOver.textContent = 'GAME OVER';
            let newP = document.createElement('p');
            newP.textContent = '...';
            app.endMessage.prepend(gameOver, newP);
        }

        // Create component for restart the game
        let exitCross = document.createElement('p');
        exitCross.textContent = 'Recommencer';
        exitCross.setAttribute('id', 'exit');
        app.endMessage.appendChild(exitCross);
        exitCross.addEventListener('click', app.reset);
    },

    /**
     * Start the game by initialisation of intervals
     */
    start: () => {
        // Starts automatic move and timer
        pacmanApp.forwardInterval = setInterval(pacmanApp.pacmanMove, app.speed);
        ghostsApp.forwardInterval = setInterval(ghostsApp.ghostMove, app.speed);
        app.timerInterval = setInterval(app.updateTimer, 1000);

        // add event listener on arrows key
        document.addEventListener('keyup', pacmanApp.handlePacmanTurn);

        // hide start button
        app.startButton.classList.add('d-none');
    },

    /**
     * Clear all intervals on the app
     */
    clearAllIntervals: () => {
        clearInterval(ghostsApp.forwardInterval);
        clearInterval(pacmanApp.forwardInterval);
        clearInterval(app.timerInterval);
    },

    /**
     * Reset app properties initial values
     * Reset pacman and ghost
     * Hide message
     * Load app
     */
    reset: () => {
        // Reset app properties
        app.timerInterval = null
        app.score = 0;
        app.nbFood = null;
        app.timer = {
            'minutes': 0,
            'seconds': 0,
        };

        // Reset ghostApp and pacmanApp properties
        ghostsApp.reset();
        pacmanApp.reset();

        // Hide message
        app.endMessage.classList.add('d-none');

        // Restart app
        app.init();
    }
}

document.addEventListener('DOMContentLoaded', app.init);