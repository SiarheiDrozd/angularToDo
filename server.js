(function(){
    var express = require('express');
    var path = require("path");
    var app = express();
    var mongoose = require('mongoose');
    var db, Task;
    var currentUser = { login: "user1", password: "user1pass" };

    var taskSchema = mongoose.Schema({
        "id": Number,
        "name": String,
        "description": String,
        "stage": Number
    });

    app.use(express.static(__dirname + "/docs/"));

    app.post("/dbConnect", function ( request, response ) {
        request.on('data', function ( data ) {
            var newUser = JSON.parse(data);
            if (currentUser !== newUser) {
                currentUser = newUser;

                mongoose.connection.close();
                var uri = "mongodb://" + currentUser.Login + ":" + currentUser.Password + "@ds157819.mlab.com:57819/angular_todo_db";
                mongoose.Promise = global.Promise;

                db = mongoose.createConnection(uri);
                db.on('error', function ( err ) {
                    response.send(false);
                    db.close();
                });
                db.once("open", function () {
                    response.send(true);
                })
            }
        });
    });


    app.get('/data', function ( request, result ) {
        if (db) {
            Task = db.model('tasks', taskSchema);

            Task.find({}, function ( err, data ) {
                if (err) {
                    handleError(err);
                } else {
                    result.send(data);
                }
            });
        }
    });

    app.listen(3000, function () {
        console.log("listening on 127.0.0.1:3000");
    });

})();
