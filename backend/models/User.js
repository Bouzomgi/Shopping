const mongoose = require('mongoose');
const joigoose = require('joigoose')(mongoose);
const { registerValidationSchema } = require('../validation');

const userSchema = new mongoose.Schema (
  joigoose.convert(registerValidationSchema)
);

module.exports = mongoose.model('User', userSchema);