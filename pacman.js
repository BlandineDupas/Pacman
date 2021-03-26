let pacman = {
    // Properties
    board: document.getElementById('board'),
    map: datas.map,

    // Methods
    // Methods
    init: function () {
        pacman.loadBoard();
    },

    createWall: function () {
        let newWall = document.createElement('div');
        newWall.classList.add('wall');
        return newWall;
    },

    createRoad: function () {
        let newRoad = document.createElement('div');
        newRoad.classList.add('road');
        return newRoad;
    },

    createFood: function () {
        let newFood = document.createElement('div');
        newFood.classList.add('food');
        return newFood;
    },

    loadBoard: function () {
        for (let rowIndex = 0 ; rowIndex < pacman.map.length ; rowIndex++) {
            // console.log(i, pacman.map[i]);
            let rowMapStr = pacman.map[rowIndex];
            let rowLength = pacman.map[rowIndex].length;
            let newRow = document.createElement('div');
            newRow.classList.add('row');
            pacman.board.appendChild(newRow);
            
            for (let columnIndex = 0; columnIndex < rowLength; columnIndex++) {
                // console.log(rowMapStr[columnIndex]);
                if (rowMapStr[columnIndex] === 'w') {
                    // console.log('wall');
                    let newWall = pacman.createWall();
                    newRow.appendChild(newWall);
                } else if (rowMapStr[columnIndex] === 'r') {
                    // console.log('road');
                    let newRoad = pacman.createRoad();
                    newRow.appendChild(newRoad);
                } if (rowMapStr[columnIndex] === 'f') {
                    // console.log('food');
                    let newRoad = pacman.createRoad();
                    newRow.appendChild(newRoad);
                    let newFood = pacman.createFood();
                    newRoad.appendChild(newFood);
                }
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', pacman.init);