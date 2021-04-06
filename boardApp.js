let boardApp = {
    // Properties
    board: document.getElementById('board'),
    map: datas.map,

    // Methods
    init: function () {
        boardApp.clearBoard(); // systematically clear before loading, to prevents double boards
        boardApp.loadBoard();
    },

    /**
     * Create a wall element
     * 
     * @param {Number} i column index
     * @returns div element
     */
    createWall: function (i) {
        let newWall = document.createElement('div');
        newWall.classList.add('wall', 'col' + i);
        return newWall;
    },

    /**
     * Create a road element
     * 
     * @param {Number} i column index
     * @returns div element
     */
    createRoad: function (i) {
        let newRoad = document.createElement('div');
        newRoad.classList.add('road', 'col' + i);
        return newRoad;
    },

    /**
     * Create a food element
     * 
     * @returns div element
     */
    createFood: function () {
        let newFood = document.createElement('div');
        newFood.classList.add('food');
        return newFood;
    },

    /**
     * Load the entire board from the map
     */
    loadBoard: function () {
        for (let rowIndex = 0 ; rowIndex < boardApp.map.length ; rowIndex++) {
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

    /**
     * Clear the board with only the start button
     */
    clearBoard: () => {
        boardApp.board.innerHTML = '<button id="start">Commencer</button>';
    }
}