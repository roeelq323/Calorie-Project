// developers: 
// Roee Levi 314621780
// Gome Ben Moshe 315752691


const mongoose = require('mongoose')

// Making the Calorie model for the mongo database
const CalorieSchema = new mongoose.Schema({
    user_id: String,
    year: Number,
    month: Number,
    day: Number,
    description: String,
    category: String,
    amount: Number
});
// Creating the model in the database
const Calorie = mongoose.model('Calories', CalorieSchema); 
module.exports = Calorie