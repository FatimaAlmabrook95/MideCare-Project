const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

// const cartItemSchema = new Schema({
//   ,{_id:false})

const cartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', },
    items: [
      {
        productId: {
          type: String,
      },
      name: String,
      quantity: {
         type: Number,
         min: 1,
         default: 1},
         price: Number
       
      }
    ],
    total: {
        type: Number,
        required: true,
       default: 0
      }
    }, {
    timestamps: true
    })

cartSchema.pre('save', function(next) { 
  let total = this.items.map((item) => {return item.price * item.quantity})
 total= total.reduce((a, b) => a + b, 0)
 this.total=total
 console.log(total);
  // do stuff
  next();
});
const Cart = model('Cart', cartSchema);

module.exports= Cart