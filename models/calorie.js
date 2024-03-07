const mongoose = require('mongoose')


const calorieSchema = new mongoose.Schema({
    user_id: String,
    year: Number,
    month: Number,
    day: Number,
    description: String,
    category: String,
    amount: Number
});

const Calorie = mongoose.model('Calories', calorieSchema);
module.exports = Calorie