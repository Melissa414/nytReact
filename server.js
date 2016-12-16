// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
// Require Article schema
var Article = require("./Models/Article");
// Create a new express app
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;
// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// -------------------------------------------------

// MongoDB configuration 
mongoose.connect("mongodb://localhost/nytreact");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------

// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// This is the route we will send GET requests to retrieve our saved articles.
// We will call this route the moment our page gets rendered
app.get("/api/saved", function(req, res) {

  // This GET request will search for all articles saved
  Article.find({}).exec(function(err, doc) {

    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});

// This is the route we will send POST requests to save each article.
// We will call this route the moment the "save" button is pressed.
app.post("/api/saved", function(req, res) {

  var title = req.body.title;
  var date = req.body.date;
  var url = req.body.url;

  // Note how this route utilizes the findOneAndUpdate function
   // to update the clickCount
  // { upsert: true } is an optional object we can pass into the findOneAndUpdate method
  // If included, Mongoose will create a new document matching the description if one is not found
  Article.findOneAndUpdate({ title: title}, 
    {$set: {date: date, url: url}}, { upsert: true }).exec(function(err) {

    if (err) {
      console.log(err);
    }
    else {
      res.send("Updated!");
    }
  });
});

app.delete("/app/saved"), function(req, res) {
  Article.findOneAndRemove({ title:title}).exec(function(err) {

    if (err) {
      console.log(err);
    }
    else {
      res.send("Deleted!");
    }
  });
}
// -------------------------------------------------

// Starting our express server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});