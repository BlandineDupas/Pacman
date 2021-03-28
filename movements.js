let movements = {
    // Properties

    // Methods
    init: () => {
        //
    },

    moveForward: (target) => {
        // TODO eatFood only for Pacman
        if (target.firstChild && target.firstChild.classList.contains('food')) {
            app.eatFood();
        }

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

            // TODO gérer la direction pour le pacman et chaque fantôme
            newTarget.classList.add('to-' + app.direction);
            // TODO id ghost vs pacman
            newTarget.setAttribute('id', 'pacman');

            return newTarget;
        } else { // prevents unnecessary treatment
            // TODO intervales pour les fantômes vs le pacman
            clearInterval(app.forwardInterval);
            return target;
        }
    },

    turnTop: (target) => {
        target.classList.remove('to-bottom', 'to-right','to-left')
        target.classList.add('to-top');
        // TODO
        app.direction = 'top';
    },

    turnBottom: (target) => {
        target.classList.remove('to-top', 'to-right','to-left')
        target.classList.add('to-bottom');
        // TODO
        app.direction = 'bottom';
    },

    turnRight: (target) => {
        target.classList.remove('to-top', 'to-bottom','to-left')
        target.classList.add('to-right');
        // TODO
        app.direction = 'right';
    },

    turnLeft: (target) => {
        target.classList.remove('to-top', 'to-bottom', 'to-right')
        target.classList.add('to-left');
        // TODO
        app.direction = 'left';
    }
}