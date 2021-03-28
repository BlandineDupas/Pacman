let ghosts = {
    // Properties

    // Methods
    init: () => {
        ghosts.createGhost();
    },
    
    createGhost: () => {
        app.pacman = document.querySelector('#row7 .col9');
        app.pacman.setAttribute('id', 'ghost');
        app.pacman.classList.add('ghost-left');
    },
}