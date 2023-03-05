const express = require("express");

const app = express();

const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.listen(3001, () => {
  console.log("listning to port " + 3001);
});
