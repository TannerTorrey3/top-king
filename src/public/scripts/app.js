/** 



 */


// NOTE: this example uses the chess.js library:
// https://github.com/jhlywa/chess.js

function Board(){
    let board = null;

    const config = {
        draggable: true,
        position: 'start',
        showNotation: false,
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

    const userBtn = document.querySelector('#user');
    const setBtn = document.querySelector('#settings');
    const expand = document.querySelector('.expandable');
    const closeButton = document.querySelector(".close-button"); 

    function toggleExpand(){
        expand.classList.toggle("view");
    }
    
    userBtn.addEventListener('click', toggleExpand)
    setBtn.addEventListener('click', toggleExpand)
    closeButton.addEventListener('click', toggleExpand)
}
Board();
    
