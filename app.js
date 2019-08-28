//jshint esversion 6
const express = require("express");
const bodyparser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

app.set("view engine", "ejs");

//This sets up public folder and that is where you put all static files like css and images
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));

let items = [];

let workItems = [];

//this is a route
app.get("/", function(req, res) {
  let dayDate = date.getDate();
  let dayDay = date.getDay();
  res.render("list", { listTitle: dayDate, newItems: items, day: dayDay });
});

app.post("/", function(req, res) {
  let item = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(item);

    res.redirect("/work");
  } else {
    items.push(item);
    // console.log("item: " + item);
    res.redirect("/");
  }
});

app.get("/work", function(req, res) {
  res.render("list", { listTitle: "Work List", newItems: workItems });
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000 if local");
});
