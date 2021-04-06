let pacmanApp = {
    // Properties
    pacman: null,
    direction: 'left',
    forwardInterval: null,
    power: false,

    // Methods
    init: () => {
        pacmanApp.createPacman();
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
        if (pacmanApp.pacman.firstChild.classList.contains('food--big')) {
            app.updateScore(20);
            pacmanApp.power = true;
            boardApp.board.classList.add('pacman-power');

            // add a blinking effect to alert player during power time
            let blink = setInterval(() => {
                boardApp.board.classList.remove('pacman-power'); 
            }, 500);

            let blink2 = setInterval(() => {
                boardApp.board.classList.add('pacman-power');  
            }, 1000);
            // 5s later, pacman loose his power
            setTimeout(() => {
                pacmanApp.power = false;
                boardApp.board.classList.remove('pacman-power');
                clearInterval(blink);
                clearInterval(blink2);
            }, 5000)
        } else {
            app.updateScore(10);
        }

        pacmanApp.pacman.firstChild.remove();       
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
        power = false;
    }
}