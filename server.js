var express = require('express');
var path = require("path");
var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.use(express.static(__dirname + "/app/"));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/app/");
});
app.listen(3000, function () {
    console.log("listening on 3000");
});
