const express = require("express");
const app = express();
const date = require(__dirname+"/date.js");

const items = ["Add your items here!"];
const workItems = [];
app.set('view engine', 'ejs');

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));
app.get("/", function(req, res) {

   const day = date.getDate();
  res.render('list', {listTitle: day,  newListItems: items});

});
app.post("/", function(req, res) {
  const item = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});
app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
});
app.post("/work", function(req, res) {
  const item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});
app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});
