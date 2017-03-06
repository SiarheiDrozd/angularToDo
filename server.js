var express = require('express');
var path = require("path");
var app = express();
var mongoose = require('mongoose');
var db, Task;
// var Task = require("./dev/components/dataBase/taskModel");
var currentUser = {login: "user1", password: "user1pass"};
var connection = false;

let taskSchema = mongoose.Schema({
    "id": Number,
    "name": String,
    "description": String,
    "stage": Number
});

app.use(express.static(__dirname + "/docs/"));

app.post("/dbConnect", function ( request, response ) {
    request.on('data', function(data){
        var newUser = JSON.parse(data);
        if(currentUser !== newUser){
            currentUser = newUser;

            mongoose.connection.close();
            let uri = "mongodb://" + currentUser.Login + ":" + currentUser.Password + "@ds157819.mlab.com:57819/angular_todo_db";
            // console.log(currentUser);
            mongoose.Promise = global.Promise;
            mongoose.connect(uri, function ( err ) {
                if(err) console.log(err);
            });
            db = mongoose.connection;
            db.on('error', console.error.bind(console, 'connection error:'));
        }
    });
});


app.get('/data', function (req, result) {
    // console.log("dataRequest");
    if(db){
        Task = mongoose.model('tasks', taskSchema);
        // console.log("db exist");
        // console.log("task ", Task);

        Task.find({}, function(err, data){
            if(err){
                handleError(err);
            }
            result.send(data);
        });
    }
});

app.listen(3000, function () {
    console.log("listening on 127.0.0.1:3000");
});
