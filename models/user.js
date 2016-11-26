var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema ({
  username: String,
  password: String,
  admin: Boolean,
  updated_at: Date,
  created_at: Date,
})

userSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

userSchema.pre('save', function(next){
  this.admin = false;
  next();
});

userSchema.plugin(passportLocalMongoose)

var User = mongoose.model('User', userSchema);

module.exports = User
