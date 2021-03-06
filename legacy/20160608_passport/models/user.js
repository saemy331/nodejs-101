var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


var userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  facebookId: String
});


userSchema.plugin(passportLocalMongoose);


var User = mongoose.model("User", userSchema);


module.exports = User;
