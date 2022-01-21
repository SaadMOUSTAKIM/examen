var express = require("express");
var router = express.Router();
const fs = require("fs");

/* GET home page. */
router.get("/", function (req, res, next) {
  let movies = fs.readFileSync("./movies_reduit.json");
  let moviesjs = JSON.parse(movies);
  res.send(moviesjs);
});

module.exports = router;
