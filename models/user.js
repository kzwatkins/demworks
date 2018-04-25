var mongoose                = require("mongoose"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    Generics                = require("../generics");
    Time                    = require("../generics/time");

const MODEL_NAME = "User";
const REF = Generics.getMongooseRef(MODEL_NAME);
const ROLE={
  REGULAR:  "0",
  CUSTOMER: "1",
  ADMIN:  "2"
};

const ROLE_MAX_LENGTH = Math.max(ROLE.ADMIN.length, Math.max(ROLE.REGULAR.length, ROLE.CUSTOMER.length));

const BLUEPRINT = {
  username: String,
  password: String,
  role: String, // ADMIN, CUSTOMER, REGULAR
  createdBy: Time.TIME_REF
};

function createSchema(){
  var schema = new mongoose.Schema(BLUEPRINT);
  schema.plugin(passportLocalMongoose);
  return schema;
}

function getRole(role){
  if(!role) return ROLE.REGULAR;
  role = role.trim().toUpperCase();

  if(role === "ADMIN") {
    return ROLE.ADMIN;
  }

  if(role === "CUSTOMER") {
    return ROLE.CUSTOMER;
  }

  return ROLE.REGULAR;
}

var User = mongoose.model(MODEL_NAME, createSchema());
var exports = module.exports = User;
exports.REF = REF;
exports.ROLE_MAX_LENGTH = ROLE_MAX_LENGTH;
exports.getRole = getRole;
