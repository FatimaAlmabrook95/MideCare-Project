const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: { type: Number,required:true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  image: { type: String,required:true },
  // size: [50ml,10ml]
  // expirationDate:

} , {
  timestamps: true
  });
productSchema.index({name: 'text', description: 'text'});

const Product = model('Prodcut', productSchema);

module.exports= Product