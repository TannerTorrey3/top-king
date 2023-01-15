/** 



 */

// NOTE: this example uses the chess.js library:
// https://github.com/jhlywa/chess.js
if('serviceWorker' in navigator){
    try{
        await navigator.serviceWorker.register('../game.js',{"scope":"/"})
        .then((registration) => {
            if(registration.installing){
                document.querySelector('#serv').textContent = "installing";
            }else if (registration.waiting) {
                document.querySelector("#serv").textContent = "waiting";
            } else if (registration.active) {
                document.querySelector("#serv").textContent = "active";
            }
        })
        .catch((err) => {
            console.log(err);
            throw err;
        })

    }
    catch(e){
        console.log(e)
    }
}

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

function resetBoard(){
    board.start(true);
}