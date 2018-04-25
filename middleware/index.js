var Generics    = require("../generics"),
    User        = require("../models/user"),
    passport    = require("passport");

var middleware = {
  authenticate: function (type){
    return passport.authenticate(type, Generics.REDIRECTION);
  },

  isValidText: function(text){
    return (text && text.length > 0);
  },

  isAuthenticated: function(req, res, next){
    if(req.isAuthenticated()){
      next();
    } else{
      req.flash("error", "Please login first.");
      res.redirect("/login");
    }
  },

  isCustomer: function(req, res, next){
    if(req.user.role === User.ROLE.Customer){
      next();
    } else{
      req.flash("error", "You do not have permission to do that.");
      res.redirect(Generics.SUPPORT_ROUTE);
    }
  },

  isAdmin: function(req, res, next){
    if(req.user.role === User.ROLE.Admin){
      next();
    } else{
      req.flash("error", "You do not have permission to do that.");
      res.redirect(Generics.SUPPORT_ROUTE);
    }
  },

  createCategory: function (Model, obj){
    Model.create(obj, function(err, obj){
      if(err){
        console.log(err.message);
      }else{
        console.log("Adding obj: " + obj);
      }
    });
  },

  isValidUsername: function(req, res, next){
    if(!Generics.isValidText(req, user.username, Generics.USERNAME_LENGTH_MIN, Generics.USERNAME_LENGTH_MAX)){
      req.flash("error", "Error, login credentials invalid. Try again.");
      return res.redirect(Generics.SUPPORT_ROUTE);
    }

    next();
  },

  noSignups: function(req, res, next){
    req.flash("error", "There are no signups at this time. Please check in the future.");
    res.redirect(Generics.SUPPORT_ROUTE);
  }
};

module.exports = middleware;
