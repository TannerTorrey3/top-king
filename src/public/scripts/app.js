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

    //Shadow root for dynamic menu content
    const modalContent = document.querySelector('.exp-content');
    const shadowHost = modalContent.attachShadow({mode:'open'});

    //Static exit button
    let exitBtn = document.createElement('span');
    exitBtn.classList.add('close-button');
    exitBtn.innerHTML = '&times';

    let dynamicContainer = null;
    //User Menu Content
    function renderUsrMn(){
        //Create Elements and assign classes
        dynamicContainer = document.createElement('section');
        dynamicContainer.classList.add('user');
        dynamicContainer.classList.add('dyn');

        const colorTheme = document.createElement('section');
        colorTheme.classList.add('modal-item');

        const themeLabel = document.createElement('label');
        themeLabel.classList.add('item-label');
        themeLabel.innerText = `Test`;
        const secondLabel = themeLabel.cloneNode(true);
        //Append children
        dynamicContainer.appendChild(colorTheme);
        dynamicContainer.appendChild(themeLabel);
        colorTheme.appendChild(themeLabel);
        colorTheme.appendChild(secondLabel);
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
        background-color: rgb(255, 255, 255);
    }

    .close-button:hover {
        background-color: #537ab1;
    }
    .user{
        background-color: #005500;
    }
    .settings{   
        background-color: #550000;
    }
    .modal-item{
        width: 35%;
        height: 30%;
        border: solid 2px aqua;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        margin-top: 5%;
    }
    .item-label{
        color: white;
        height: 30%;
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
    
