const { Cart, Product } = require('../models')


const create = async (req, res) => {
  try {
    let { items, user } = req.body
    const findCart = await Cart.findOne({ user: user });
    if (findCart) {
      let cartItems = items.map(async (item) => {
        // item ={
        //   productId:
        //   quantity:
        // }
        const itemProduct = await Product.findOne({ _id: item.productId }).select('_id name price');
        if (!itemProduct) {
          res.status(404).send({ error: "item not found" });
          return;
        }
        if (itemProduct) {
          let itemIndex = findCart.items.findIndex((cartItem)=> cartItem.productId == itemProduct._id)
          //  > -1 
          if (itemIndex > -1) {
            let foundItem = findCart.items[itemIndex];
            foundItem.quantity += item.quantity;
          } else {
            console.log();
            findCart.items.push({
              quantity: item.quantity,
              productId: itemProduct._id,
              price: itemProduct.price,
              name: itemProduct.name,
              _id: itemProduct._id
            })
          }
        }
      

      })
      await Promise.all(cartItems)
      let sentCart = await findCart.save()
      res.status(201).json({
       cart: sentCart
     })
    } else {
     let cartItems = items.map(async (item) => {
        const itemProduct = await Product.findOne({ _id: item.productId }).select('_id name price');
        if (itemProduct) {
        return {
          quantity: item.quantity,
          productId: itemProduct._id.toString(),
          price: itemProduct.price,
          name: itemProduct.name,
          _id: itemProduct._id
        }
      }
      })
      cartItems = await Promise.all(cartItems)

      let cart = await Cart.create({
        user: user,
        items:cartItems
      });
      // cart.items.push(cartItems)
    res.status(201).json({
        cart: cart
      })   
    }


  } catch (err) {
    console.log(err);
    res.status(400).send({
      error: 'somthing wrong'
    })
  }
}
const findByUserId = async (req, res) => {
  try {
    const id = req.params.id;
    const cart = await Cart.findOne({ user: id })
    res.json({
      cart: cart
    })
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: 'somthing wrong'
    })
  }
}
const updateById = async (req, res) => {
  try {
    const id = req.params.id;
    const {items} = req.body
    console.log(data);
    const cart = await Cart.findOne({ user: id })
    let cartItems = items.map(async (item) => {
      const itemProduct = await Product.findOne({ _id: item.productId }).select('_id name price');
      if (itemProduct) {
      return {
        productId: itemProduct._id.toString(),
        price: itemProduct.price,
        name: itemProduct.name,
        // _id: itemProduct._id
      }
    }
    })
    cartItems = await Promise.all(cartItems)
    cart.items = cartItems
    let sentCart = await cart.save()
    res.status(200).json({ data: sentCart, message: 'updated' });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: 'somthing wrong'
    })
  }
}
const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const cart = await Cart.findByIdAndDelete(id);
    res.status(200).json({ data: id, message: 'deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: 'somthing wrong'
    })
  }
}


module.exports = {
  create,
  findByUserId,
  updateById,
  deleteById
}