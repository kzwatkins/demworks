var mongoose        = require("mongoose"),
    Generics        = require("../generics"),
    Time            = require("../generics/time");

const MODEL_NAME = "Challenge";
const REF = Generics.getMongooseRef(MODEL_NAME);

const BLUEPRINT = {
  createdBy: Time.TIME_REF
};

function createChallengeObj(){
  var challnege = {
        };

  return challenge;
}

var Challenge = Generics.createModel(MODEL_NAME, BLUEPRINT);
var exports = module.exports = Challenge;
exports.REF = REF;
exports.createChallengeObj = createChallengeObj;
