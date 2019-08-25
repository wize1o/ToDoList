//jshint esversion 6
const express = require("express");
const bodyparser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.use(bodyparser.urlencoded({ extended: true }));

var items = [];

//this is a route
app.get("/", function(req, res) {
  var today = new Date();
  var currentDay = today.getDay();
  var day = "";

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  var day = today.toLocaleDateString("en-US", options);
  res.render("list", { DAY: day, newItems: items });
});

app.post("/", function(req, res) {
  item = req.body.newItem;

  items.push(item);
  // console.log("item: " + item);
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000 if local");
});
