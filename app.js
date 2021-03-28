let app = {
    // Properties
    pacman: null,
    direction: 'left',
    forwardInterval: null,
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
    testInterval: null,
    test: 0,

    // TODO créer un fantôme
    // TODO gérer des mouvements aléatoires de fantôme
    // TODO améliorer le design

    // Methods
    init: () => {
        boardApp.init();
        ghosts.init();
        app.updateNbFood();
        app.createPacman();
        document.addEventListener('keyup', app.handleTurn);
        app.timerSpan.textContent = '0:00';
        // app.timerInterval = setInterval(app.updateTimer, 1000);
        // app.forwardInterval = setInterval(movements.moveForward, app.speed, app.pacman);
        // app.forwardInterval = setInterval(app.pacmanMove, app.speed, app.updatePacman);

        app.forwardInterval = setInterval(app.pacmanMove, app.speed);

        // app.testInterval = setInterval(app.testing, 1000, app.testing2);
    },

    testing: (test) => {
        let value = test();
        console.log('testing', value);
    },

    testing2: () => {
        app.test++
        console.log('testing2', app.test);
        return app.test;
    },

    pacmanMove: () => {
        app.pacman = movements.moveForward(app.pacman);
        console.log('pacmanMove :', app.pacman)
    },

    /*pacmanMove: (update) => {
        let pac = update();
        console.log(pac);
    },

    updatePacman: () => {
        app.pacman = movements.moveForward(app.pacman);
        return app.pacman;
    },*/

    createPacman: () => {
        app.pacman = document.querySelector('#row15 .col9');
        app.pacman.setAttribute('id', 'pacman');
        app.pacman.classList.add('to-left');
    },

    eatFood: () => {
        app.score += 10;
        app.pacman.firstChild.remove();
        
        app.updateScore();
        app.updateNbFood();
    },

    updateScore: () => {
        app.scoreSpan.textContent = app.score;
    },

    updateTimer: () => {
        console.log(app.timer.seconds);

        if (app.timer.seconds < 59) {
            app.timer.seconds++;
            console.log(app.timer.seconds);
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
        clearInterval(app.forwardInterval);
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

    handleTurn: (evt) => {
        if (evt.key === 'ArrowUp') {
            movements.turnTop(app.pacman);
        } else if (evt.key === 'ArrowDown') {
            movements.turnBottom(app.pacman);
        } else if (evt.key === 'ArrowRight') {
            movements.turnRight(app.pacman);
        } else if (evt.key === 'ArrowLeft') {
            movements.turnLeft(app.pacman);
        }
        // clear to prevents addition of intervals
        clearInterval(app.forwardInterval);
        // relaunch interval (necessary when a wall stopped it)
        // app.forwardInterval = setInterval(app.moveForward, app.speed);
        app.forwardInterval = setInterval(app.pacmanMove, app.speed);

    },
}

document.addEventListener('DOMContentLoaded', app.init);