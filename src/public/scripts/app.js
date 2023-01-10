const Chessboard = require('@chrisoakman/chessboardjs');
const root = document.getElementById('root');
const shadow = root.attachShadow({mode:'open'});
let board = Chessboard('myBoard')
shadow.appendChild(board);