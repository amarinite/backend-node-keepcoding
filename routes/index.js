var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Nodepop ",
    url: "https://github.com/amarinite/backend-node-keepcoding",
  });
});

module.exports = router;
