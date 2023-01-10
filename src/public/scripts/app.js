
const config = {
    draggable: true,
    position: 'start',
    showNotation: false,
    showErrors: true,
    snapSpeed: 'slow'
}
const board = Chessboard("myBoard", config)

let resetBoard = () => {
    board.start(true)
}