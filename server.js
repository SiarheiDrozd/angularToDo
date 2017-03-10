(function(){
    var express = require('express');
    var path = require("path");
    var app = express();
    var mongoose = require('mongoose');
    var db, Task;
    var currentUser = { Login: "user1", Password: "user1pass" };

    var taskSchema = mongoose.Schema({
        "stage": Number,
        "name": String,
        "description": String
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
                    db.close();
                })
            }
        });
    });

    app.post("/data", function ( request, response ) {
        request.on('data', function ( data ) {
            var newData = JSON.parse(data);

            if (newData.user && currentUser !== newData.user) {
                currentUser = newData.user;
            }
                mongoose.connection.close();
                var uri = "mongodb://" + currentUser.Login + ":" + currentUser.Password + "@ds157819.mlab.com:57819/angular_todo_db";
                mongoose.Promise = global.Promise;

                db = mongoose.createConnection(uri);
                db.on('error', function ( err ) {
                    response.send("fail");
                    db.close();
                });
                db.once("open", function () {
                    Task = db.model(`${currentUser.Login}_tasks`, taskSchema);
                    newData.data.map(function ( item ) {
                        Task.find({"_id": item["_id"]}, function ( err, data ) {
                            if(err) {console.log(err)}
                            if(!data) {
                                var task = new Task(item);
                                task.save();
                            }
                        });
                    });
                    response.send("success");
                    db.close();
                })

        });
    });

    app.get('/data', function ( request, result ) {
        if (db) {
            Task = db.model(`${currentUser.Login}_tasks`, taskSchema);

            Task.find({}, function ( err, data ) {
                if (err) {
                    console.log(err);
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
