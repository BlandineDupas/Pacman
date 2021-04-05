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

    // TODO permettre au fantôme de tuer le pacman
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
            app.displayWinMessage('win');
        }
    },

    displayWinMessage: (winOrLoose) => {
        clearInterval(pacmanApp.forwardInterval);
        clearInterval(app.timerInterval);
        app.winMessage.innerHTML = '';
        app.winMessage.classList.remove('d-none');

        if (winOrLoose === 'win') {
            let firstP = document.createElement('p');
            firstP.textContent = 'Vous avez';
            let secondP = document.createElement('p');
            secondP.textContent = 'GAGN\u00C9';
            let thirdP = document.createElement('p');
            thirdP.textContent = '!!!';
            app.winMessage.prepend(firstP, secondP, thirdP);
        } else {
            let gameOver = document.createElement('p');
            gameOver.textContent = 'GAME OVER';
            let newP = document.createElement('p');
            newP.textContent = '...';
            app.winMessage.prepend(gameOver, newP);
        }

        let exitCross = document.createElement('p');
        exitCross.textContent = 'Recommencer';
        exitCross.setAttribute('id', 'exit');
        app.winMessage.appendChild(exitCross);
        exitCross.addEventListener('click', app.restart);
    },

    restart: () => {
        // hide win message
        document.getElementById('winMessage').classList.add('d-none');
        
        // suppress pacman
        document.getElementById('pacman').classList.add('to-left');
        document.getElementById('pacman').removeAttribute('id');

        // clear all intervals
        app.clearAllIntervals();

        // restart initial direction, score, food, timer
        app.direction = 'left';
        app.score = 0;
        app.updateScore;
        app.nbFood = null;
        app.timer = {
            'minutes': 0,
            'seconds': 0,
        };
    
        app.init();
    },

    clearAllIntervals: () => {
        clearInterval(ghostsApp.forwardInterval);
        clearInterval(pacmanApp.forwardInterval);
        clearInterval(app.timerInterval);
    }
}

document.addEventListener('DOMContentLoaded', app.init);