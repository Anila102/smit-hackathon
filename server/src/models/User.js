const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    role: { type: String, enum: ['seller', 'purchaser'], default: 'purchaser' }
});
const User = mongoose.model('users', UserSchema);
module.exports = User;