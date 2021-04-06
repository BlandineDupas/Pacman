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
    winMessage: document.getElementById('winMessage'),

    // TODO faire des nourritures plus grosses
    // TODO permettre au pacman de tuer un fantôme
    // TODO améliorer le design
    // TODO gérer plusieurs fantômes
    // TODO ---/!\---- DOCUMENTER LES FONCTIONS ---/!\----

    // Methods
    init: () => {
        boardApp.init();
        ghostsApp.init();
        pacmanApp.init();
        app.updateNbFood();
        app.timerInterval = setInterval(app.updateTimer, 1000);
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
            app.displayWinMessage('win');
        }
    },

    /**
     * Display an end of game message
     * 
     * @param {String} winOrLoose 'win' or 'loose'
     */
    displayWinMessage: (winOrLoose) => {
        app.winMessage.innerHTML = '';
        app.winMessage.classList.remove('d-none'); // display message

        if (winOrLoose === 'win') { // create a win message
            let firstP = document.createElement('p');
            firstP.textContent = 'Vous avez';
            let secondP = document.createElement('p');
            secondP.textContent = 'GAGN\u00C9';
            let thirdP = document.createElement('p');
            thirdP.textContent = '!!!';
            app.winMessage.prepend(firstP, secondP, thirdP);
        } else {// create a game over message
            let gameOver = document.createElement('p');
            gameOver.textContent = 'GAME OVER';
            let newP = document.createElement('p');
            newP.textContent = '...';
            app.winMessage.prepend(gameOver, newP);
        }

        // Create component for restart the game
        let exitCross = document.createElement('p');
        exitCross.textContent = 'Recommencer';
        exitCross.setAttribute('id', 'exit');
        app.winMessage.appendChild(exitCross);
        exitCross.addEventListener('click', app.start);
    },

    /**
     * Reset all initial values and start the game
     */
    start: () => {
        // hide win message
        document.getElementById('winMessage').classList.add('d-none');
        
        // reset app, pacman and ghost
        app.reset()
        ghostsApp.reset();
        pacmanApp.reset();

        app.init();
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
     */
    reset: () => {
        app.timerInterval = null
        app.score = 0;
        app.nbFood = null;
        app.timer = {
            'minutes': 0,
            'seconds': 0,
        };    
    }
}

document.addEventListener('DOMContentLoaded', app.init);