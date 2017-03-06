var mongoose = require('mongoose');
let taskSchema = mongoose.Schema({
    "id": Number,
    "name": String,
    "description": String,
    "stage": Number
});
var Task = mongoose.model('tasks', taskSchema);

module.exports = Task;