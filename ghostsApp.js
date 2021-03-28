let ghostsApp = {
    // Properties
    ghost: null,
    direction: 'left',
    forwardInterval: null,

    // Methods
    init: () => {
        ghostsApp.createGhost();
    },
    
    createGhost: () => {
        ghostsApp.ghost = document.querySelector('#row7 .col9');
        ghostsApp.ghost.setAttribute('id', 'ghost');
        ghostsApp.ghost.classList.add('to-left');
    },

    ghostMove: () => {
        ghostsApp.ghost = movementsApp.moveForward(ghostsApp.ghost, ghostsApp.direction, ghostsApp.forwardInterval, 'ghost');
    },
}