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

router.post("/signup", middleware.authenticate("local"), function(req, res){
  var username = req.body.username;
  var password = req.body.password;

  User.register({username:username, role: "0", active: false}, password, function(err, foundUser){
    if(err){
      req.flash("error", err.message);
      return res.redirect("/signup");
    }

    var authenticate = User.authenticate();
    authenticate(username, password, function(err, result) {
      if (err) {
        req.flash("error", err.message);
        return res.redirect("/login");
      }

      req.flash(foundUser.username + " has successfully registered: " + result);
      res.redirect("/challenge");
    });
  });
});


module.exports = router;
