var mongoose = require('mongoose'), 
  Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

UserSchema.methods.validPassword = function (password) {
  console.log('in validatePassword password', password);
  console.log('user password', this.password);
  return password === this.password;
};

module.exports = mongoose.model('User', UserSchema);