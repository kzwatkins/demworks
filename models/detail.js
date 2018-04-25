var mongoose        = require("mongoose"),
    Generics        = require("../generics"),
    Time            = require("../generics/time");

const MODEL_NAME = "Detail";
const REF = Generics.getMongooseRef(MODEL_NAME);

const BLUEPRINT = {
  createdBy: Time.TIME_REF
};

function createDetailObj(choice){
  var detail = {
        };

  return detail;
}

var Detail = Generics.createModel(MODEL_NAME, BLUEPRINT);
var exports = module.exports = Detail;
exports.REF = REF;
exports.createDetailObj = createDetailObj;
