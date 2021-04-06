let movementsApp = {
    // Properties

    // Methods
    init: () => {
        //
    },

    /**
     * Makes the target move forward by changing div classname & id
     * Clear interval if target can't move in the given direction (wall...)
     * return new location of target (or the same if can't move...)
     * 
     * @param {*} target Node element, Ghost or Pacman who wants to move
     * @param {String} targetDirection current direction of target
     * @param {*} targetInterval interval to clear if necessary
     * @param {String} targetId identity of target (pacman, ghost1, ghost2...)
     * @returns Node Element, new position of target
     */
    moveForward: (target, targetDirection, targetInterval, targetId) => {
        let newTarget;

        if (target.classList.contains('to-left')) {
            // Can't go out of board but can pass to the other side
            if (!target.previousSibling) {
                // find the last div of the current row
                let colNb = Object.values(target.closest('.row').lastChild.classList).find(className => className.match(/^col[0-9]+$/));
                let rowNb = target.closest('.row').id;
                newTarget = document.querySelector('#' + rowNb + ' .' + colNb);
            } else {
                newTarget = target.previousSibling;
            }
        }
        
        else if (target.classList.contains('to-right')) {
            // Can't go out of board but can pass to the other side
            if (!target.nextSibling) {
                // find the first div of the current row
                let colNb = Object.values(target.closest('.row').firstChild.classList).find(className => className.match(/^col[0-9]+$/));
                let rowNb = target.closest('.row').id;
                newTarget = document.querySelector('#' + rowNb + ' .' + colNb);
            } else {
                newTarget = target.nextSibling;
            }
        }
        
        else if (target.classList.contains('to-top')) {
            let colNb = Object.values(target.classList).find(className => className.match(/^col[0-9]+$/));
            let rowNb = target.closest('.row').previousSibling.id;
            newTarget = document.querySelector('#' + rowNb + ' .' + colNb);
        }
        
        else if (target.classList.contains('to-bottom')) {
            let colNb = Object.values(target.classList).find(className => className.match(/^col[0-9]+$/));
            let rowNb = target.closest('.row').nextSibling.id;
            newTarget = document.querySelector('#' + rowNb + ' .' + colNb);
        }

        // Can't walk on a wall
        if (!newTarget.classList.contains('wall')) {
            let fightResult = null;
            if (newTarget.getAttribute('id')) { // meeting case
                fightResult = movementsApp.kill(targetId);
            }
            if (!newTarget.getAttribute('id') || fightResult) {
                target.classList.remove('to-top', 'to-bottom', 'to-right','to-left');
                target.removeAttribute('id');
    
                newTarget.classList.add('to-' + targetDirection);
                newTarget.setAttribute('id', targetId);

                return newTarget;
            }
        } else { // prevents unnecessary treatment
            clearInterval(targetInterval);
            return target;
        }
    },

    /**
     * Makes the target turn in the chosen direction by changing div classnames
     * 
     * @param {*} target Node element, Pacman or Ghost who wants to move
     * @param {String} direction new direction to take
     * @returns new direction
     */
    turn: (target, direction) => {
        const directions = [
            'top',
            'bottom',
            'left',
            'right'
        ];

        const directionsToRemove = directions.filter(dir => dir !== direction);
        const directionToAdd = direction;

        target.classList.remove('to-' + directionsToRemove[0], 'to-' + directionsToRemove[1],'to-' + directionsToRemove[2])
        target.classList.add('to-' + directionToAdd);

        return direction;
    },

    /**
     * Oppose ghost and pacman
     * if pacman has power he wins
     * else ghost wins
     * 
     * @param {*} firstOpponent active cell (pacman or ghost)
     * @returns firstOpponent if he has won, null if he has lost
     */
    kill: (firstOpponent) => {
        if (pacmanApp.power) { // if pacman has the power
            // Kill the ghost by removing all its attributes and clearing his move interval
            ghostsApp.ghost.classList.remove('to-' + ghostsApp.direction);
            ghostsApp.ghost.removeAttribute('id');
            ghostsApp.ghost = null;
            clearInterval(ghostsApp.forwardInterval);

            app.updateScore(50);

            // return something in order to end moveForward method
            if (firstOpponent === 'pacman') {
                return pacmanApp.pacman
            } else {
                return null;
            }
        } else {
            app.clearAllIntervals();
            app.displayEndMessage('loose'); 

            // return something in order to end moveForward method
            if (firstOpponent === 'ghost') {
                return ghostsApp.ghost
            } else {
                return null;
            }
        }
    }
}