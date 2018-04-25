var express     = require("express"),
    router      = express.Router();

router.get("/", function(req, res){
  res.send("Reached Challenges");
});

var exports = module.exports = router;
