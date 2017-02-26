var express = require('express');
var path = require("path");
var app = express();

app.use(express.static(__dirname + "/docs/"));

app.get('/', function (req, res) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.sendFile(__dirname + "/docs/");
});
app.listen(3000, function () {
    console.log("listening on 3000");
});
