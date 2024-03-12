// developers: 
// Roee Levi 314621780
// Gome Ben Moshe 315752691


const mongoose = require('mongoose');

// The function which connects to mongodb atlas
async function connectToDatabase() {
    try {
        await mongoose.connect('mongodb+srv://gomebenmoshe:gome120@cluster0.2zod7bi.mongodb.net/?retryWrites=true&w=majority', { // Connection information
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
        throw error; // Rethrow the error to handle it in the caller
    }
}

module.exports = connectToDatabase;