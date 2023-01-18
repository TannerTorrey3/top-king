
const compression = require('compression');
// Require Express
const express = require('express');
// Create an Express App
const app = express();
app.use(compression());
// Set the public directory as the root of the application
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/scripts'));
// Start the server on port 3000
app.listen(3060, () => {
  console.log('http://localhost:3060');
});
// Create a route for the home page
app.get('/', (req, res) => {
  res.render('index.html');//i
  const game = chess();
  console.log(game.fen)
});

