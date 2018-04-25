// Commonly Used

const DB_NAME = "demworks";
const CHALLENGES_ROUTE = "/challenges";
const DETAILS_ROUTE = "/:id/details";
const LOGIN_ROUTE="/login";
const SECRET_CRED = "Democracy Works! Challenge";
const MONGOOSE = "mongoose";
const USER_MODEL_PATH = "../models/user";
const CHALLENGES_MODEL_PATH = "../models/challenge";
const DETAIL_MODEL_PATH = "../models/answer";
const EXPRESS_SANITIZER = "express-sanitizer";
const DEFAULT_IMGS = ["https://images.unsplash.com/uploads/1411160110892ab555b6f/80b0d25e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5629cba052a0cde456e4d9a63c64c692&auto=format&fit=crop&w=751&q=80",
"https://images.unsplash.com/photo-1485331129317-1717811a2b75?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1b713c86ebb20befc80029db6bc98dae&auto=format&fit=crop&w=1207&q=80",
"https://images.unsplash.com/photo-1477281765962-ef34e8bb0967?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=31e82f46b077da92e44712da8f71bc51&auto=format&fit=crop&w=632&q=80",
"https://images.unsplash.com/photo-1472739841375-d0ea9f0cb6a6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a7f48efc018b6d583fd6dc737a1a8b2f&auto=format&fit=crop&w=334&q=80",
"https://images.unsplash.com/photo-1442504028989-ab58b5f29a4a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d700e1019e9b1ed821cf067403b23171&auto=format&fit=crop&w=750&q=80"
];

const EXPRESS_SESSION_CREDS = {
  secret: process.env.SECRET_CRED || SECRET_CRED,
  resave: false,
  saveUninitialized: false
};

const REDIRECTION = {
  successRedirect: CHALLENGES_ROUTE,
  failureRedirect: LOGIN_ROUTE,
  failureFlash: true
};

var mongoose          = require(MONGOOSE);

var exports = {
  DB_NAME:  DB_NAME,
  EXPRESS_SANITIZER: EXPRESS_SANITIZER,
  REDIRECTION: REDIRECTION,
  EXPRESS_SESSION_CREDS: EXPRESS_SESSION_CREDS,
  CHALLENGES_ROUTE: CHALLENGES_ROUTE,
  DETAILS_ROUTE: DETAILS_ROUTE,

  createSchema:  function(blueprint){
    return new mongoose.Schema(blueprint);
  },

  createModel:    function (modelName, blueprint){
    return mongoose.model(modelName, this.createSchema(blueprint));
  },

  getMongooseRef: function(modelName){
    return {
              type: mongoose.Schema.Types.ObjectId,
              ref: modelName
            };
  },

  sanitize: function(req, text){
    if(!text) return null;

    return req.sanitize(text);
  },

  isValidText: function(req, text, minLength, maxLength){
    return (text && text.length >= minLength && text.length <= maxLength && this.isTextSame(req, text));
  },

  randNum: function(min, max){
    return min + Math.floor(Math.random()*(max-min));
  },

  getRandImg(){
    return DEFAULT_IMGS[this.randNum(0, DEFAULT_IMGS.length)];
  }
};

module.exports = exports;
