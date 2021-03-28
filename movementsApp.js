let movementsApp = {
    // Properties

    // Methods
    init: () => {
        //
    },

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

    turnTop: (target) => {
        target.classList.remove('to-bottom', 'to-right','to-left')
        target.classList.add('to-top');

        return 'top';
    },

    turnBottom: (target) => {
        target.classList.remove('to-top', 'to-right','to-left')
        target.classList.add('to-bottom');

        return 'bottom';
    },

    turnRight: (target) => {
        target.classList.remove('to-top', 'to-bottom','to-left')
        target.classList.add('to-right');
 
        return 'right';
    },

    turnLeft: (target) => {
        target.classList.remove('to-top', 'to-bottom', 'to-right')
        target.classList.add('to-left');
  
        return 'left';
    }
}