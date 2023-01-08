const root = document.getElementById('root');
const shadow = root.attachShadow({mode:'open'});
const dynComp = document.createElement('div');
dynComp.innerHTML = 'This is a dynamic component';
shadow.appendChild(dynComp);