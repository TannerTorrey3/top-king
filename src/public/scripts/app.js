/** 



 */

// NOTE: this example uses the chess.js library:
// https://github.com/jhlywa/chess.js
var board = null;

const config = {
    draggable: true,
    position: 'start',
    showNotation: false,
    showErrors: true,
    onDrop: onDrop
}
board = Chessboard("myBoard", config)

function onDrop (source, target, piece, newPos, oldPos, orientation) {
}

let resetBoard = () => {
    board.start(true);
}