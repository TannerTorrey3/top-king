
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
        });

    }
    catch(e){
        console.log(e)
    }
}