var express     = require("express"),
    passport    = require("passport"),
    router      = express.Router();

module.exports = router;

router.get("/", function(req, res){
  res.render("landing");
})
