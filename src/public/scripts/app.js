/** 



 */


// NOTE: this example uses the chess.js library:
// https://github.com/jhlywa/chess.js
import { Chess } from "./chess.js";
function Board(){
    let board = null;

    const game = new Chess();
    const fenEl =  document.querySelector('#fen');
    const statusEl =  document.querySelector('#status');
    function onDragStart (source, piece, position, orientation) {
        // do not pick up pieces if the game is over
        if (game.isGameOver()) return false
      
        // only pick up pieces for the side to move
        if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
            (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
          return false
        }
    }
    let status,moveColor;
    function updateStatus () {
        status = ''
      
        moveColor = 'White'
        if (game.turn() === 'b') {
          moveColor = 'Black'
        }
      
        // checkmate?
        if (game.isCheckmate()) {
          status = 'Game over, ' + moveColor + ' is in checkmate.'
        }
      
        // draw?
        else if (game.isDraw()) {
          status = 'Game over, drawn position'
        }
      
        // game still on
        else {
          status = moveColor + ' to move'
      
          // check?
          if (game.isCheck()) {
            status += ', ' + moveColor + ' is in check'
          }
        }
        
        updateGameDisplay();
    }
    function updateGameDisplay(){
        statusEl.innerHTML = `${status}`;
        fenEl.innerHTML = `${game.fen()}`;
    }
    function toggleOrientation(){
        if(board.orientation() === 'white')board.orientation('black');
        else{board.orientation('white');}
    }
    function onDrop (source, target) {
        // see if the move is legal
        try {
            game.move({
                from: source,
                to: target,
                promotion: 'q' // NOTE: always promote to a queen for example simplicity
            });
            toggleOrientation();
        }
        catch(isIllegal){
            board.position(game.fen())
        }
        // illegal move
        
        updateStatus()
        
    }

    function onSnapEnd () {
        board.position(game.fen())
    }

    const config = {
        draggable: true,
        position: 'start',
        showNotation: false,
        showErrors: true,
        dropOffBoard: 'snapback',
        onDragStart: onDragStart,
        onDrop: onDrop,
        onSnapEnd: onSnapEnd
    }

    board = Chessboard("myBoard", config);
    updateStatus();

    function resetGame(){
        board.start(true);
        game.reset();
        board.orientation('white');
        updateStatus();
        updateGameDisplay();
        
    }
    
    const reset = document.querySelector("#res");
    reset.addEventListener('click',()=> {
        resetGame();
    });

    window.addEventListener('resize', () => {
        board.resize();
    });
    
    //Shadow root for dynamic menu content
    const modalContent = document.querySelector('.exp-content');
    const shadowHost = modalContent.attachShadow({mode:'open'});

    //Static exit button
    let exitBtn = document.createElement('span');
    exitBtn.classList.add('close-button');
    exitBtn.innerHTML = '&times';
    let root = document.documentElement;
    let dynamicContainer = null;
    //User Menu Content
    function renderUsrMn(){
        //Color Schemes Map
        const schemeData = new Map();
        schemeData.set("Ash & Water", (["#2d2c2c","#595959","#63a1c5","#ffffff","#63a1c5","#ffffff","#000000","#63a1c5","#48565f"]));
        schemeData.set("Dark & Royal",(["#111111","#424242","#860FD3","#ffffff","#860FD3","#ffffff","#000000","#860FD3","#898915"]));
        schemeData.set("Snow & Pine ",(["#ffffff","#dddddd","#0C650A","#000000","#0C650A","#ffffff","#000000","#0C650A","#412482"]));
        schemeData.set("White",(["#000000","#000000","#000000","#000000","#000000","#000000","#000000","ffffff"]));
        //Create Dynamic Container for dynamic content
        dynamicContainer = document.createElement('ul');
        dynamicContainer.classList.add('user');
        dynamicContainer.classList.add('dyn');
        //Usr Menu Item
        const colorTheme = document.createElement('li');//Color Theme Selector
        colorTheme.classList.add('modal-item');
        //Label for Color Profiles
        const themeLabel = document.createElement('label');
        themeLabel.classList.add('item-label');
        themeLabel.innerText = `Color Profiles`;
        //Dropdown for color profiles
        const colorProfilesEl = generateDrop();
        let rootmini = root.style;
        function generateDrop(){
            let dropUlEl = document.createElement('ul');
            dropUlEl.innerHTML = `<span class="profile selected">Greys<img class="clr-img"src="./img/board/greys.png" alt=""></span>`;
            dropUlEl.classList.add('drop');

            schemeData.forEach((v,k) => {
                let genEl = generateDropEl(k,v);
                dropUlEl.appendChild(genEl);
            })
            return dropUlEl;
        }
        function generateDropEl(key,colors){
            let dropEl = document.createElement('li');
            dropEl.innerHTML = `${key}<img class="clr-img"src="./img/board/blck-wht.png" alt="">`;
            dropEl.classList.add('profile');
            dropEl.setAttribute('id', key);
            dropEl.addEventListener('click',() => {
                updateColorScheme(colors);
            });
            return dropEl;
        }
        function updateColorScheme(colors){

            rootmini.setProperty('--bck-main', `${colors[0]}`);
            rootmini.setProperty('--bck-sec', `${colors[1]}`);
            rootmini.setProperty('--bck-alt', `${colors[2]}`);
            rootmini.setProperty('--brd-main', `${colors[3]}`);
            rootmini.setProperty('--brd-alt', `${colors[4]}`);
            rootmini.setProperty('--font-main', `${colors[5]}`);
            rootmini.setProperty('--font-sec', `${colors[6]}`);
            rootmini.setProperty('--font-alt', `${colors[7]}`);
            rootmini.setProperty('--high-main', `${colors[8]}`);
        }
        function updateBoardScheme(){
            rootmini.setProperty('--brd-0-wht', "#ffffff");
            rootmini.setProperty('--brd-0-blk', "#000000");
        }
        
        //Append children
        dynamicContainer.appendChild(colorTheme);
        colorTheme.appendChild(themeLabel);
        colorTheme.appendChild(colorProfilesEl);
        const secondTheme = colorTheme.cloneNode(true);
        dynamicContainer.appendChild(secondTheme);
        shadowHost.appendChild(dynamicContainer);
    }
    //Settings Menu Content
    function renderSettMn(){
        dynamicContainer = document.createElement('section');
        dynamicContainer.classList.add('settings');
        dynamicContainer.classList.add('dyn');
        shadowHost.appendChild(dynamicContainer);
    }
    function renderMenu(id) {
        if(id === 'usr')renderUsrMn();
        if(id === 'sett')renderSettMn();
    }
    function derenderMenu(){
        shadowHost.removeChild(dynamicContainer);
    }
    function checkEmpty(mode){
        return mode === 0;
    }
    //Dynamic menu content
    function loadModal(id,mode){
       if(checkEmpty(mode)){
        renderMenu(id)
       }
       else{
        derenderMenu();
        renderMenu(id);
       }
    }

    let contentStyle = document.createElement("style");
    contentStyle.textContent = `
    .close-button {
        position: fixed;
        top:0;
        left:0;
        float: left;
        width: 1.5rem;
        line-height: 1.5rem;
        text-align: center;
        cursor: pointer;
        background-color: var(--brd-main)
    }
    .close-button:hover {
        background-color: var(--bck-alt);
    }
    .modal-item{
        width: 35%;
        height: 10%;
        border: solid 1px var(--brd-main);
        display: flex;
        flex-direction: column;
        row-gap: 15%;
        padding:2%;
        box-shadow: 5px 4px 5px #000000;
        background-color: var(--bck-sec);
        overflow-y:hidden;
    }
    .item-label{
        color: var(--font-main);
        display: flex;
        justify-content: center;
        align-items:center;
        text-align: center;
        font-size: 1.4rem;
        font-family: 'Roboto';
    }
    .drop{
        height: 2.3rem;
        overflow-y: hidden;
        font-size: 1.2rem;
        font-family: 'Roboto';
        padding:0.5%;
        text-align: center;
        color: var(--font-main);
        list-style-type: none;
        background-color: var(--bck-sec);
        box-shadow: none;
        border: none;
        transition: box-shadow 0.15s border 0s;
    }
    .drop img{
        width: auto;
        height: 2.4rem;
    }
    .drop li{
        color: var(--font-main);
        font-size:1.2rem;
        font-family: 'Roboto';
    }
    .drop li:hover{
        color: var(--font-sec);
        background-color:var(--bck-alt); 
    }
    .modal-item:hover{
        overflow-y: visible;
    }
    .modal-item:hover .drop{
        min-height: 135px;
        overflow-y: scroll;
        box-shadow: 1px 13px 4px #000000;
        border: solid 1px #ffffff;
        transition: box-shadow 0.15s;
        padding: 2.5%
        row-gap: 1%;
    }
    .profile{
        display:flex;
        flex-direction:row;
        justify-content:space-between;
        flex-wrap: nowrap;
        margin:1%;
        text-align: center;
    }
    .dyn{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        column-gap: 10%;
    }`;

    shadowHost.appendChild(contentStyle);
    shadowHost.appendChild(exitBtn);
    const userBtn = document.querySelector('#user');
    const setBtn = document.querySelector('#settings');
    const expand = document.querySelector('.expandable');

    const map = new Map();
    map.set('usr','sett'); 
    map.set('sett','usr'); 

    function configClassesExpand(id){
        if(expand.classList.length > 1){
            if(expand.classList.contains(id)){expand.classList.remove(id);toggleExpand();derenderMenu();}
            else {expand.classList.remove(map.get(id));expand.classList.add(id);loadModal(id,1);}
        }
        else{
            expand.classList.add(id); 
            loadModal(id,0);
            toggleExpand();
        }
        
    }
    function closeExpandable(){
        expand.classList.remove('usr');
        expand.classList.remove('sett');
        toggleExpand();
        derenderMenu();
    }
    function toggleExpand(){
        expand.classList.toggle("view");
    }

    userBtn.addEventListener('click',()=> configClassesExpand('usr'));
    setBtn.addEventListener('click', ()=> configClassesExpand('sett'));
    exitBtn.addEventListener('click', closeExpandable);

}
Board();
    
