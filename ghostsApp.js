let ghostsApp = {
    // Properties
    ghost: null,
    direction: 'left',
    forwardInterval: null,

    // Methods
    init: () => {
        ghostsApp.createGhost();
        ghostsApp.forwardInterval = setInterval(ghostsApp.ghostMove, app.speed);
    },
    
    createGhost: () => {
        ghostsApp.ghost = document.querySelector('#row7 .col9');
        ghostsApp.ghost.setAttribute('id', 'ghost');
        ghostsApp.ghost.classList.add('to-left');
    },

    ghostMove: () => {
        ghostsApp.checkRoad(ghostsApp.ghost);
        let newGhost = movementsApp.moveForward(ghostsApp.ghost, ghostsApp.direction, ghostsApp.forwardInterval, 'ghost');
        if (ghostsApp.ghost === newGhost) {
            console.log('normalement c\'est un mur');

            // ghostsApp.direction = movementsApp.turnBottom(ghostsApp.ghost);
            // clear to prevents addition of intervals
            clearInterval(ghostsApp.forwardInterval);
            // relaunch interval (necessary when a wall stopped it)
            ghostsApp.forwardInterval = setInterval(ghostsApp.ghostMove, app.speed);
        } else {
            ghostsApp.ghost = newGhost;
            console.log('else');
        }
    },

    checkRoad: (target) => {
        let allowedDirections = [];
        // Si la case du dessus n'est pas un mur
        let colNb = Object.values(target.classList).find(className => className.match(/^col[0-9]+$/));
        let rowNb = target.closest('.row').previousSibling.id;
        topCell = document.querySelector('#' + rowNb + ' .' + colNb);
        if (topCell.classList.contains('road')) {
            // x chances de turnTop
            // console.log('ghost peut monter');
            allowedDirections.push('top');
            // clearInterval(ghostsApp.forwardInterval);
        }
        // Si la case du dessous n'est pas un mur
        colNb = Object.values(target.classList).find(className => className.match(/^col[0-9]+$/));
        rowNb = target.closest('.row').nextSibling.id;
        bottomCell = document.querySelector('#' + rowNb + ' .' + colNb);
        if (bottomCell.classList.contains('road')) {
            // x chances de turnBottom
            // console.log('ghost peut descendre');
            allowedDirections.push('bottom');
            // clearInterval(ghostsApp.forwardInterval);
        }
        // Si la case de gauche n'est pas un mur
        leftCell = target.previousSibling;
        if (leftCell.classList.contains('road')) {
            // x chances de turnLeft
            allowedDirections.push('left');
            // console.log('ghost peut aller à gauche');
        }
        // Si la case de droite n'est pas un mur
        rightCell = target.nextSibling;
        if (rightCell.classList.contains('road')) {
            // x chances de turnRight
            allowedDirections.push('right');
            // console.log('ghost peut aller à droite');
        }


        // Préciser la direction actuelle et son opposée
        let currentDirection = ghostsApp.direction;
        let oppositeDirection = ghostsApp.getOppositeDirection(currentDirection);
        // Recenser toutes les directions possibles 
        let otherDirections = allowedDirections.filter(direction => direction !== currentDirection && direction !== oppositeDirection);
        let position3 = otherDirections[0] ? otherDirections[0] : null;
        let position4 = otherDirections[1] ? otherDirections[1] : null;
        console.log('otherDirections', otherDirections);
        // Appeler determinesProbability
        let newDirection = ghostsApp.determinesProbability(currentDirection, oppositeDirection, position3, position4);
        console.log('newDirection', newDirection);
    },

    /**
     * 
     * @param {*} direction1 direction actuelle
     * @param {*} direction2 direction opposée
     * @param {*} direction3 autre direction disponible
     * @param {*} direction4 autre direction disponible
     * @returns 
     */
    determinesProbability: (direction1, direction2, direction3, direction4) => {
        let randomNumber = Math.floor(Math.random() * (100 - 1 + 1) + 1);
        
        if (randomNumber < 50) {
            return direction1; // continue tout droit 50%
        } else if (randomNumber < 60) {
            return direction2; // demi-tour 10%
        } else if (randomNumber < 80 && direction3) {
            return direction3; // tourne 20%
        } else if (randomNumber < 101 && direction4) {
            return direction4; // tourne aussi 20%
        } else {
            return direction1; // si pas d'autre direction disponible, continue tout droit
        }
    },

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