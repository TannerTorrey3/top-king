// Require Express
const express = require('express');

// Create an Express App
const app = express();

// Set the public directory as the root of the application
app.use(express.static(__dirname + '/public'));

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Express server running on port 3000');
});

// Create a route for the home page
app.get('/', (req, res) => {
  res.sendFile('index.html');//i
});
//TODO Attempt to render chessboard using @chrisoakman/chessboardjs
//TODO Add in chess game logic and game end checks chess: ^1.1.0
//TODO Add Service workers for above checks