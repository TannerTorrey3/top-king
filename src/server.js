
const compression = require('compression');

// Require Express
const express = require('express');
// Create an Express App
const app = express();
app.use(compression());
// Set the public directory as the root of the application
app.use(express.static(__dirname + '/public'));
// Start the server on port 3000
app.listen(4090, () => {
  console.log('http://localhost:4090');
  
});
// Create a route for the home page
app.get('/', (req, res) => {
  res.render('index.html');//i
});


