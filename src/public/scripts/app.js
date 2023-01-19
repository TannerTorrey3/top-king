/** 



 */

// NOTE: this example uses the chess.js library:
// https://github.com/jhlywa/chess.js

function Board(){
    let board = null;

    const config = {
        draggable: true,
        position: 'start',
        showNotation: true,
        showErrors: true,
        onDrop: onDrop
    }

    board = Chessboard("myBoard", config)

    function onDrop (source, target, piece, newPos, oldPos, orientation) {
        console.log(`${source}-${target}`)
    }

    const reset = document.querySelector("#res");
    reset.addEventListener('click',()=> {
        board.start(true);
    });
    window.addEventListener('resize', () => {
        board.resize();
    });
}
Board();
    
