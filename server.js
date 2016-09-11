var express = require("express"),
    server = express(),
    morgan = require("morgan"),
    bodyParser = require("body-parser"),
    config = require("./config/config"),
    MongoClient = require("mongodb").MongoClient,
    routes = require("./routes");

MongoClient.connect(config.database, function (err, db) {
    if (err) throw err;

    //server.use(express.static(__dirname + "/public"));
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(bodyParser.json());
    server.use(morgan("dev"));
    server.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "HEAD, GET, POST, PUT, DELETE");
        res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-type, Authorization, x-access-token");
        next();
    });

    server.disable('x-powered-by');
    server.listen(config.port, function () {
        var host = this.address().address,
            portlet = this.address().port;
            
        console.log("Welcome to project.");
    });

    routes(server, db);
});