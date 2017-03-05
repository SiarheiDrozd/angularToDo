var express = require('express');
var path = require("path");
var app = express();
var mongoose = require('mongoose');
var db, Task;

app.use(express.static(__dirname + "/docs/"));


let uri = 'mongodb://user1:user1pass@ds157819.mlab.com:57819/angular_todo_db';
mongoose.Promise = global.Promise;
mongoose.connect(uri);
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    let taskSchema = mongoose.Schema({
        "id": Number,
        "name": String,
        "description": String,
        "stage": Number
    });
    Task = mongoose.model('tasks', taskSchema);
    let someTask = new Task({
        "id": 0,
        "name": "task1",
        "description": "do something",
        "stage": 0
    });
});


app.get('/data', function (req, result) {
    Task.find({}, function(err, data){
        if(err){
            handleError(err);
        }
        result.send(data);
    });

});

app.listen(3000, function () {
    console.log("listening on 127.0.0.1:3000");
});
