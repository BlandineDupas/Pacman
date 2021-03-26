let pacmanApp = {
    // Properties
    pacman: null,

    // Methods
    init: () => {
        boardApp.init();
    },

    createPacman: () => {
        pacman = document.createElement('div');
        pacman.setAttribute('id', 'pacman');

    }

}

document.addEventListener('DOMContentLoaded', pacmanApp.init);