var mongoose = require('mongoose'), 
  Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

UserSchema.methods.validPassword = function (password) {
  console.log('in validatePassword password', password);
  console.log('user password', this.password);
  console.log('123123123');
  console.log('password === this.password', password === this.password);
  console.log('aaaaaaaaaaaaaa');
  return password === this.password;
};

module.exports = mongoose.model('User', UserSchema);