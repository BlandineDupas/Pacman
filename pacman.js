let pacman = {
    // Properties
    board: document.getElementById('board'),
    map: datas.map,

    // Methods
    init: function () {
        pacman.loadBoard();
    },

    createWall: function (number) {
        for (let i = 0; i < number ; i++) {
            let newWall = document.createElement('div');
            newWall.classList.add('wall');
            pacman.board.appendChild(newWall);
        }
    },

    createRoad: function (number, empty = false) {
        for (let i = 0; i < number ; i++) {
            let newRoad = document.createElement('div');
            newRoad.classList.add('road');
            pacman.board.appendChild(newRoad);
            if (!empty) {
                newRoad.appendChild(pacman.createFood());
            }
        }
    },

    createFood: function () {
        let newFood = document.createElement('div');
        newFood.classList.add('food');
        return newFood;
    },

    loadBoard: function () {
        console.log(pacman.map[0].number);
        for (let i = 0 ; i < pacman.map.length ; i++) {
            console.log(i);
            if (pacman.map[i].type === "wall") {
                pacman.createWall(pacman.map[i].number);
                console.log(pacman.map[i]['number']);
            } else if (pacman.map[i].type === "road") {
                pacman.createRoad(pacman.map[i].number, pacman.map[i].empty);
                console.log(pacman.map[i].number);
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', pacman.init);