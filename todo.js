//TODO// Attempt to render chessboard using @chrisoakman/chessboardjs
//TODO// Add Service workers for above checks
//TODO// implement Caching system for game.js & implement chess engine within cache ... Use lighthouse and workbox?

//TODO// DEBUG app.js menu popups when closed using x does not render dynamic content on reopen

//TODO add vars to all css colors. except shadows ... should never be too dark on main theme where you cant see black shadows
//TODO// create js functions in app.js for creating drop elements .. take in data {} including name and colors and values
//TODO Add gamemodes
//TODO complete game menu window
//TODO complete user menu window
//TODO complete settings menu window
//TODO fix lighthouse Fails including preloading fonts and dont block render while loading
//TODO serve high resolution images min of 96x96
//TODO implement magic interface for card system. Different magic types damage, heal, etc,. Damage can randomly break movement weakening pieces
//TODO add function to sw.js -> if userConfig.json in cache -> create then render else-> use for render
//TODO implement own version of board in index.html -- REMOVE render blocking resources
//TODO add media queries and target css // different layouts for various devices
//TODO// Add in chess game logic and game end checks chess: ^1.1.0
//TODO implement a CSP to prevent XSS attacks https://developer.chrome.com/docs/lighthouse/best-practices/csp-xss/?utm_source=lighthouse&utm_medium=devtools