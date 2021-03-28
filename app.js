let app = {
    // Properties
    timerInterval: null,
    score: 0,
    scoreSpan: document.querySelector('#score span'),
    nbFood: null,
    speed: 150,
    timer: {
        'minutes': 0,
        'seconds': 0,
    },
    timerSpan: document.querySelector('#timer span'),

    // TODO - en cours - créer un fantôme
    // TODO - en cours - gérer des mouvements aléatoires de fantôme
    // TODO améliorer le design
    // TODO ---/!\---- DOCUMENTER LES FONCTIONS ---/!\----

    // Methods
    init: () => {
        boardApp.init();
        ghostsApp.init();
        pacmanApp.init();
        app.updateNbFood();
        app.timerInterval = setInterval(app.updateTimer, 1000);
        pacmanApp.forwardInterval = setInterval(pacmanApp.pacmanMove, app.speed);
        ghostsApp.forwardInterval = setInterval(ghostsApp.ghostMove, app.speed);
    },

    updateScore: () => {
        app.scoreSpan.textContent = app.score;
    },

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

    updateNbFood: () => {
        app.nbFood = Object.keys(document.querySelectorAll('.food')).length;
        if (app.nbFood === 0) {
            app.displayWinMessage();
        }
    },

    displayWinMessage: () => {
        clearInterval(pacmanApp.forwardInterval);
        clearInterval(app.timerInterval);
        document.getElementById('winMessage').classList.remove('d-none');

        let exitCross = document.getElementById('exit');
        exitCross.addEventListener('click', app.restart);
    },

    restart: () => {
        // hide win message
        document.getElementById('winMessage').classList.add('d-none');
        
        // suppress pacman
        document.getElementById('pacman').classList.add('to-left');
        document.getElementById('pacman').removeAttribute('id');

        // restart initial direction, interval, score
        app.direction = 'left';
        app.forwardInterval = null;
        app.timerInterval = null;
        app.score = 0;
        app.updateScore;
        app.nbFood = null;
        app.timer = {
            'minutes': 0,
            'seconds': 0,
        };
    
        app.init();
    },
}

document.addEventListener('DOMContentLoaded', app.init);