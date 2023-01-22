
if('serviceWorker' in navigator){
    try{
        await navigator.serviceWorker.register('../game.js',{"scope":"/",'type':'module'})
        .then((registration) => {
            if(registration.installing){
            }else if (registration.waiting) {
            } else if (registration.active) {
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