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
     * @param {node} target Ghost or Pacman who wants to move
     * @param {String} targetDirection current direction of target
     * @param {*} targetInterval interval to clear if necessary
     * @param {String} targetId identity of target (pacman, ghost1, ghost2...)
     * @returns 
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
            target.classList.remove('to-top', 'to-bottom', 'to-right','to-left');
            target.removeAttribute('id');

            newTarget.classList.add('to-' + targetDirection);
            newTarget.setAttribute('id', targetId);

            return newTarget;
        } else { // prevents unnecessary treatment
            clearInterval(targetInterval);
            return target;
        }
    },

    /**
     * Makes the target turn in the chosen direction by changing div classnames
     * 
     * @param {node} target Pacman or Ghost who wants to move
     * @param {String} direction new direction to take
     * @returns 
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
        console.log(directionsToRemove, directionToAdd);

        target.classList.remove('to-' + directionsToRemove[0], 'to-' + directionsToRemove[1],'to-' + directionsToRemove[2])
        target.classList.add('to-' + directionToAdd);

        return direction;
    }
}