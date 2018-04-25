var express           = require("express"),
    mongoose          = require("mongoose"),
    request           = require("request"),
    flash             = require("connect-flash"),
    moment            = require("moment"),
    passport          = require("passport"),
    LocalStrategy     = require("passport-local"),
    expressSession    = require("express-session"),
    ejs               = require("ejs"),
    bodyParser        = require("body-parser"),
    methodOverride    = require("method-override"),
    Generics          = require("./generics"),
    User              = require("./models/user"),
    Detail            = require("./models/detail"),
    Challenge         = require("./models/challenge"),
    expressSanitizer  = require(Generics.EXPRESS_SANITIZER),
    app               = express();

var challengeRoutes      = require("./routes/challenges"),
    detailRoutes         = require("./routes/details"),
    authRoutes           = require("./routes");

init();

function init(){
  initSettings();
  initDB();
  initPassport();
  app.use(getLocals);
  initRoutes();
}

function initSettings(){
  app.use("/static", express.static(__dirname +'/public'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(expressSession(Generics.EXPRESS_SESSION_CREDS));
  app.use(methodOverride("_method"));
  app.use(flash());
  app.use(expressSanitizer());
  app.set("view engine", "ejs");
}

function initPassport(){
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
}

function initDB(){
  var url = process.env.DATABASE_URL || "mongodb://localhost/"+ Generics.DB_NAME;
  mongoose.connect(url);
}

function getLocals(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  app.locals.moment = moment;

  next();
}

function initRoutes(){
  app.use(Generics.CHALLENGES_ROUTE, challengeRoutes);
  app.use(Generics.CHALLENGES_ROUTE, detailRoutes);
  app.use(authRoutes);
}

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Democracy Works! Challenge by KZW server started: " + process.env.PORT + " and IP: " + process.env.IP);
});
