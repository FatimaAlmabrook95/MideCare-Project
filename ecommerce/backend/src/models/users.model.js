const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone:{
    type: Number,
    // required: true,
    // unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: { type: String, default: 'athenticated' }
});

const User = model('User', userSchema);

module.exports= User