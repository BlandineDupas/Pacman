let ghostsApp = {
    // Properties
    ghost: null,
    direction: 'left',
    forwardInterval: null,

    // Methods
    init: () => {
        ghostsApp.createGhost();
        // ghostsApp.forwardInterval = setInterval(ghostsApp.ghostMove, app.speed);
    },
    
    createGhost: () => {
        ghostsApp.ghost = document.querySelector('#row7 .col9');
        ghostsApp.ghost.setAttribute('id', 'ghost');
        ghostsApp.ghost.classList.add('to-left');
    },

    /**
     * Check the road
     * Determine new direction with probabilities
     * Turn if necessary
     * Move forward
     */
    ghostMove: () => {
        const allowedDirections = ghostsApp.checkRoad(ghostsApp.ghost);
        const newDirection = ghostsApp.determinesProbability(allowedDirections);
        if (newDirection != ghostsApp.direction) {
            ghostsApp.direction = movementsApp.turn(ghostsApp.ghost, newDirection);
        }
        
        ghostsApp.ghost = movementsApp.moveForward(ghostsApp.ghost, ghostsApp.direction, ghostsApp.forwardInterval, 'ghost');
    },

    /**
     * 
     * @param {*} target Node element, Pacman or Ghost
     * @returns Array of directions
     */
    checkRoad: (target) => {
        let allowedDirections = [];

        // if top cell isn't a wall
        let colNb = Object.values(target.classList).find(className => className.match(/^col[0-9]+$/));
        let rowNb = target.closest('.row').previousSibling.id;
        topCell = document.querySelector('#' + rowNb + ' .' + colNb);
        if (topCell.classList.contains('road')) {
            allowedDirections.push('top');
        }

        // if bottom cell isn't a wall
        colNb = Object.values(target.classList).find(className => className.match(/^col[0-9]+$/));
        rowNb = target.closest('.row').nextSibling.id;
        bottomCell = document.querySelector('#' + rowNb + ' .' + colNb);
        if (bottomCell.classList.contains('road')) {
            allowedDirections.push('bottom');
        }

        // if left cell isn't a wall
        leftCell = target.previousSibling;
        if (leftCell.classList.contains('road')) {
            allowedDirections.push('left');
        }

        // if right cell isn't a wall
        rightCell = target.nextSibling;
        if (rightCell.classList.contains('road')) {
            allowedDirections.push('right');
        }

        return allowedDirections;
    },

    /**
     * 
     * @param {Array} allowedDirections 
     * @returns {String} direction
     */
    determinesProbability: (allowedDirections) => {       
        // Precise current direction and its opposite
        let currentDirection = ghostsApp.direction;
        let oppositeDirection = ghostsApp.getOppositeDirection(currentDirection);
        
        // Determines other possible directions
        let otherDirections = allowedDirections.filter(direction => direction !== currentDirection && direction !== oppositeDirection);
        let direction3 = otherDirections[0] ? otherDirections[0] : null;
        let direction4 = otherDirections[1] ? otherDirections[1] : null;

        let randomNumber = Math.floor(Math.random() * (100 - 0 + 1) + 0); // from 0 to 100 (both included)

        if (allowedDirections.includes(currentDirection)) { // if current direction is allowed (no wall)
            if (randomNumber < 67) {
                return currentDirection; // 67% keeps current direction
            } else if (randomNumber < 70) {
                return oppositeDirection; // 3% does a U-turn
            } else if (randomNumber < 85 && direction3) {
                return direction3; // 15% turns
            } else if (randomNumber < 101 && direction4) {
                return direction4; // 15% turns
            } else {
                return currentDirection; // if no other options, keeps current direction
            }
        } else { // if current direction leads to a wall
            if (randomNumber < 6 || (!direction3 && ! direction4)) {
                return oppositeDirection; // 6% does a U-turn
            } else if (randomNumber < 53 && direction3) {
                return direction3; // 47% turns
            } else if (randomNumber < 101 && direction4) {
                return direction4; // 47% turns
            } else if (direction3) {
                return direction3; // if no other options, turns to direction3 (if exists)
            } else {
                return oppositeDirection; // does a U-turn
            }
        }

    },

    /**
     * 
     * @param {String} currentDirection 
     * @returns {String}
     */
    getOppositeDirection: (currentDirection) => {
        if (currentDirection === 'top') {
            return 'bottom';
        } else if (currentDirection === 'bottom') {
            return 'top';
        } else if (currentDirection === 'left') {
            return 'right';
        } else if (currentDirection === 'right') {
            return 'left';
        }
    }
} 