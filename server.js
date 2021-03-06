(function(){
    var express = require('express');
    var path = require("path");
    var app = express();
    var mongoose = require('mongoose');
    var db, Task;

    var taskSchema = mongoose.Schema({
        "stage": Number,
        "name": String,
        "description": String,
        "expiryDate": String
    });
    var userSchema = mongoose.Schema({
        "name": String,
        "password": String
    });
    app.set('port', (process.env.PORT || 5000));
    app.use(express.static(__dirname + "/docs/"));

    app.post("/dbConnect", function ( request, response ) {
        request.on('data', function ( data ) {
            let newUser = JSON.parse(data);
            let Users = db.model(`users`, userSchema);
            Users.findOne({"name": newUser.name}, function ( err, user ) {
                if(err){console.log(err)}
                // console.log("connect", user);
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
            let newUser = JSON.parse(data);
            let Users = db.model(`users`, userSchema);

            Users.create({"name": newUser.name, "password": newUser.password}, function ( err, user ) {
                if(err){console.log("error ",err)}
                // console.log("register", user);
                response.send(`${user.name} created`);
            });
        });
    });

    app.get('/data/:user', function ( request, result ) {

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
            let newData = JSON.parse(data);

            Task = db.model(`${newData.user.name}_tasks`, taskSchema);
            newData.data.forEach((task)=>{
                if(!task._id){
                    Task.create({
                        "stage": task.stage,
                        "name": task.name,
                        "description": task.description,
                        "expiryDate": task.expiryDate
                    })
                } else {
                    Task.update({ _id: task._id }, { $set: {
                        "stage": task.stage,
                        "name": task.name,
                        "description": task.description,
                        "expiryDate": task.expiryDate
                    }}, function () {

                    });
                }
            });
            response.send("done");
        });
    });

    app.delete("/data/:user/:id", function ( request, response ) {
        Task = db.model(`${request.params.user}_tasks`, taskSchema);
        Task
            .find({_id: request.params.id})
            .remove()
            .exec();
        response.send(request.params.id + " deleted");
    });

    ( function () {
        let uri = "mongodb://user1:user1pass@ds157819.mlab.com:57819/angular_todo_db";
        mongoose.Promise = global.Promise;

        db = mongoose.createConnection(uri);
        db.on('error', function ( err ) {
            console.log("connection error: ", err);
        });
        db.once("open", function () {
            console.log("connected to dataBase");
        })
    })();

    app.listen(app.get('port'), function() {
        console.log('Node app is running on port', app.get('port'));
    });
})();
