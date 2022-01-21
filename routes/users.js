var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

var moviesRouter = require("./routes/movies");

app.use("/movies", moviesRouter);

module.exports = router;
