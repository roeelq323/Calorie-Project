// developers: 
// Roee Levi 314621780
// Gome Ben Moshe 315752691


const mongoose = require('mongoose');

// Making the User model for the mongo database
const UserSchema = new mongoose.Schema({
    id: String,
    first_name: String,
    last_name: String,
    birthday: Date
});
// Creating the model in the database
const User = mongoose.model('Users', UserSchema);
module.exports = User;