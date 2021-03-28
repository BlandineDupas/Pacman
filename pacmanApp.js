let pacmanApp = {
    // Properties
    pacman: null,
    direction: 'left',
    forwardInterval: null,

    // Methods
    init: () => {
        pacmanApp.createPacman();
        document.addEventListener('keyup', pacmanApp.handlePacmanTurn);
    },

    createPacman: () => {
        pacmanApp.pacman = document.querySelector('#row15 .col9');
        pacmanApp.pacman.setAttribute('id', 'pacman');
        pacmanApp.pacman.classList.add('to-left');
    },

    pacmanMove: () => {
        if (pacmanApp.pacman.firstChild && pacmanApp.pacman.firstChild.classList.contains('food')) {
            pacmanApp.eatFood();
        }
        pacmanApp.pacman = movementsApp.moveForward(pacmanApp.pacman, pacmanApp.direction, pacmanApp.forwardInterval, 'pacman');
    },

    handlePacmanTurn: (evt) => {
        if (evt.key === 'ArrowUp') {
            pacmanApp.direction = movementsApp.turnTop(pacmanApp.pacman);
        } else if (evt.key === 'ArrowDown') {
            pacmanApp.direction = movementsApp.turnBottom(pacmanApp.pacman);
        } else if (evt.key === 'ArrowRight') {
            pacmanApp.direction = movementsApp.turnRight(pacmanApp.pacman);
        } else if (evt.key === 'ArrowLeft') {
            pacmanApp.direction = movementsApp.turnLeft(pacmanApp.pacman);
        }
        // clear to prevents addition of intervals
        clearInterval(pacmanApp.forwardInterval);
        // relaunch interval (necessary when a wall stopped it)
        pacmanApp.forwardInterval = setInterval(pacmanApp.pacmanMove, app.speed);
    },

    eatFood: () => {
        app.score += 10;
        pacmanApp.pacman.firstChild.remove();
        
        app.updateScore();
        app.updateNbFood();
    }
}