const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  fs.readdir(`./files`, function (err, data) {
    res.render("index", { files: data });
  });
});

app.post("/create", function (req, res) {
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("")}.txt`,
    `${req.body.details}`,
    function (err) {
      if (err) {
        console.error(err);
      } else {
        res.redirect("/");
      }
    }
  );
});

app.get("/file/:filename", function (req, res) {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", function (err, data) {
    res.render("show", {
      filename: req.params.filename,
      data,
    });
  });
});

app.listen(3000);