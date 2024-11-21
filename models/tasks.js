
const mongoose = require('mongoose');

const tasksSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean,
    
});
const Task = mongoose.model('tasks', tasksSchema);

module.exports  = Task
