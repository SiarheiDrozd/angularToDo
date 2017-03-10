(function(){
    var express = require('express');
    var path = require("path");
    var app = express();
    var mongoose = require('mongoose');
    var db, Task;

    var taskSchema = mongoose.Schema({
        "stage": Number,
        "name": String,
        "description": String
    });
    var userSchema = mongoose.Schema({
        "name": String,
        "password": String
    });

    app.use(express.static(__dirname + "/docs/"));

    app.post("/dbConnect", function ( request, response ) {
        request.on('data', function ( data ) {
            var newUser = JSON.parse(data);
            let Users = db.model(`users`, userSchema);
            Users.findOne({"name": newUser.Login}, function ( err, user ) {
                if(err){console.log(err)}
                console.log(user);
                if(user){
                    response.send(true);
                } else {
                    response.send(false);
                }
            });
        });
    });

    app.post("/dbRegister", function ( request, response ) {
        request.on('data', function ( data ) {
            var newUser = JSON.parse(data);
            let Users = db.model(`users`, userSchema);
            console.log(newUser);

            Users.create({"name": newUser.Login, "password": newUser.Password}, function ( err, user ) {
                if(err){console.log("error ",err)}
                console.log(user);
                response.send(`${user.Login} created`);
            });
        });
    });

    app.get('/data/:user', function ( request, result ) {
        console.log(request.params);

        Task = db.model(`${request.params.user}_tasks`, taskSchema);
        Task.find({}, function ( err, data ) {
            if (err) {
                console.log(err);
            } else {
                result.send(data);
            }
        });
    });

    app.post("/data", function ( request, response ) {
        request.on('data', function ( data ) {
            var newData = JSON.parse(data);
            console.log(newData, data);

            Task = db.model(`${newData.user.Login}_tasks`, taskSchema);
            // Task
        });
    });



    ( function () {
        var uri = "mongodb://user1:user1pass@ds157819.mlab.com:57819/angular_todo_db";
        mongoose.Promise = global.Promise;

        db = mongoose.createConnection(uri);
        db.on('error', function ( err ) {
            console.log("connection error: ", err);
        });
        db.once("open", function () {
            console.log("connected to dataBase");
        })
    })();

    app.listen(3000, function () {
        console.log("listening on 127.0.0.1:3000");
    });

})();
