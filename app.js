// developers: 
// Roee Levi 314621780
// Gome Ben Moshe 315752691

const express = require('express');
const connectToDatabase = require('./config/db') // Getting the function which connects to atlas 
const app = express();
const routes = require('./routes/index'); // Getting all the routes we created
const port = 3000;


// Connect to MongoDB Atlas
connectToDatabase()
  .then(() => {
    // Start your Express server once the connection is established
    const port = process.env.PORT || 3000;
    app.use(express.json());
    app.use('/',routes) // Giving the app all the routes
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((error) => { // If anything goes wrong
    console.error('Unable to start server:', error);
    process.exit(1); // Exit the process if the connection fails
  });