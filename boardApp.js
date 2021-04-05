let boardApp = {
    // Properties
    board: document.getElementById('board'),
    map: datas.map,

    // Methods
    // Methods
    init: function () {
        boardApp.clearBoard();
        boardApp.loadBoard();
    },

    createWall: function (i) {
        let newWall = document.createElement('div');
        newWall.classList.add('wall', 'col' + i);
        return newWall;
    },

    createRoad: function (i) {
        let newRoad = document.createElement('div');
        newRoad.classList.add('road', 'col' + i);
        return newRoad;
    },

    createFood: function () {
        let newFood = document.createElement('div');
        newFood.classList.add('food');
        return newFood;
    },

    loadBoard: function () {
        for (let rowIndex = 0 ; rowIndex < boardApp.map.length ; rowIndex++) {
            // console.log(i, boardApp.map[i]);
            let rowMapStr = boardApp.map[rowIndex];
            let rowLength = boardApp.map[rowIndex].length;
            
            let newRow = document.createElement('div');
            newRow.classList.add('row');
            newRow.setAttribute('id', 'row' + rowIndex);
            boardApp.board.appendChild(newRow);
            
            for (let columnIndex = 0; columnIndex < rowLength; columnIndex++) {
                // console.log(rowMapStr[columnIndex]);
                if (rowMapStr[columnIndex] === 'w') {
                    // console.log('wall');
                    let newWall = boardApp.createWall(columnIndex);
                    newRow.appendChild(newWall);
                } else if (rowMapStr[columnIndex] === 'r') {
                    // console.log('road');
                    let newRoad = boardApp.createRoad(columnIndex);
                    newRow.appendChild(newRoad);
                } if (rowMapStr[columnIndex] === 'f') {
                    // console.log('food');
                    let newRoad = boardApp.createRoad(columnIndex);
                    newRow.appendChild(newRoad);
                    let newFood = boardApp.createFood();
                    newRoad.appendChild(newFood);
                }
            }
        }
    },

    clearBoard: () => {
        boardApp.board.innerHTML = '';
    }
}