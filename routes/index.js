var express     = require("express"),
    passport    = require("passport"),
    User        = require("../models/user"),
    middleware  = require("../middleware"),
    router      = express.Router();

router.get("/", function(req, res){
  res.render("landing");
});

router.get("/login", function(req, res){
  res.render("login");
});

router.post("/login", middleware.authenticate("local"), function(req, res){
  var user = req.user;
  req.flash("success", "Successfully logged in, " + user.username);
  res.redirect("/challenge");
});

router.get("/signup", function(req, res){
  res.render("signup");
});

router.post("/signup", function(req, res){
  var user = new User({username:req.body.username, role: "0"}); // Assume regular user.
  User.register(user, req.body.password, function(err, user){
    if(err){
      req.flash("error", err.message);
      return res.redirect("/signup");
    }

    req.flash("success", user.username + " has successfully registered.");
    res.redirect("/challenge");
  });
});


module.exports = router;
