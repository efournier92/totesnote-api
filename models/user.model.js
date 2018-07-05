const mongoose = require( `mongoose` );
const Schema = mongoose.Schema;
const crypto = require(`crypto`);
const jwt = require(`jsonwebtoken`);

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true, },
  hash: String,
  salt: String,
});

userSchema.methods.setPassword = function setPassword(password){
  this.salt = crypto.randomBytes(16).toString(`hex`);
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString(`hex`);
};

userSchema.methods.validatePassword = function validatePassword(password) {
  let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString(`hex`);
  return this.hash === hash;
};

userSchema.methods.generateJwt = function generateJwt() {
  let expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    exp: parseInt(expiry.getTime() / 1000)
  }, process.env.JWT_SECRET);
};

mongoose.model(`User`, userSchema);

