var path = require("path");
var express = require("express");   // http.createServer

var homeRouter = require("./routes/home"); // router
var aboutRouter = require("./routes/about"); // router

var app = express();


// Settings
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "templates"));


var logger = function(req, res, next) {
  console.log("Request on", req.url, "at", new Date());
  next();
}
app.use(logger);


app.use("/", homeRouter);
app.use("/about", aboutRouter);


app.listen(3000, function() {
  console.log("Server is running");
});
