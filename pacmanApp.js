let pacmanApp = {
    // Properties
    pacman: null,
    direction: 'left',
    forwardInterval: null,

    // Methods
    init: () => {
        pacmanApp.createPacman();
        // document.addEventListener('keyup', pacmanApp.handlePacmanTurn);
        // pacmanApp.forwardInterval = setInterval(pacmanApp.pacmanMove, app.speed);
    },

    createPacman: () => {
        pacmanApp.pacman = document.querySelector('#row15 .col9');
        pacmanApp.pacman.setAttribute('id', 'pacman');
        pacmanApp.pacman.classList.add('to-left');
    },


    /**
     * Assign a new cell to pacman (moveForward)
     * Eat food on the new cell
     */
    pacmanMove: () => {
        pacmanApp.pacman = movementsApp.moveForward(pacmanApp.pacman, pacmanApp.direction, pacmanApp.forwardInterval, 'pacman');
        
        // eat food
        if (pacmanApp.pacman.firstChild && pacmanApp.pacman.firstChild.classList.contains('food')) {
            pacmanApp.eatFood();
        }
    },

    /**
     * Event on arrow keys to turn the pacman
     * 
     * @param {KeyboardEvent} evt 
     */
    handlePacmanTurn: (evt) => {
        if (evt.key === 'ArrowUp') {
            pacmanApp.direction = movementsApp.turn(pacmanApp.pacman, 'top');
        } else if (evt.key === 'ArrowDown') {
            pacmanApp.direction = movementsApp.turn(pacmanApp.pacman, 'bottom');
        } else if (evt.key === 'ArrowRight') {
            pacmanApp.direction = movementsApp.turn(pacmanApp.pacman, 'right');
        } else if (evt.key === 'ArrowLeft') {
            pacmanApp.direction = movementsApp.turn(pacmanApp.pacman, 'left');
        }
        
        // clear to prevents addition of intervals
        clearInterval(pacmanApp.forwardInterval);
        // relaunch interval (necessary when a wall stopped it)
        pacmanApp.forwardInterval = setInterval(pacmanApp.pacmanMove, app.speed);
    },

    /**
     * Remove food and update score
     */
    eatFood: () => {
        pacmanApp.pacman.firstChild.remove();
        
        app.updateScore(10);
        app.updateNbFood();
    },

    /**
     * Reset pacmanApp properties initial values
     */
    reset: () => {
        pacmanApp.pacman = null;
        document.removeEventListener('keyup', pacmanApp.handlePacmanTurn);
        pacmanApp.direction = 'left';
        pacmanApp.forwardInterval = null;
    }
}