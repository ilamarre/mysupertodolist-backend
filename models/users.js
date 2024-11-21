const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    pseudo: String,
    password: String,
    token: String,
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tasks' }],
});


const User = mongoose.model('users', usersSchema);

module.exports = User
