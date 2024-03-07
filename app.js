
const express = require('express');
const connectToDatabase = require('./config/db')
const app = express();
const routes = require('./routes/index');
const port = 3000;


// Connect to MongoDB Atlas
connectToDatabase()
  .then(() => {
    // Start your Express server once the connection is established
    const port = process.env.PORT || 3000;
    app.use(express.json());
    app.use('/',routes)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((error) => { v  
    console.error('Unable to start server:', error);
    process.exit(1); // Exit the process if the connection fails
  });