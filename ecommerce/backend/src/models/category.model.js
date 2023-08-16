const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  madeIn: {
    type: String,
    required: true,
  },
  image: { type: String,required:true }
});

const Category = model('Category', categorySchema);

module.exports= Category