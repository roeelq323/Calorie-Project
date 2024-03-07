import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    id: String,
    first_name: String,
    last_name: String,
    birthday: Date
});

const User = mongoose.model('Users', userSchema);
module.exports = User;