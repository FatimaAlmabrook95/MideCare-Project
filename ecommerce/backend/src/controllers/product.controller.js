const { Product } = require('../models')

const create = async (req, res) => {
  try {
    // let {name,madeIn,image} = req.body
    const product = await Product.create(req.body);
    res.status(201).json({
      product: product
    })
  } catch (err) {
    console.log(err);
    res.status(400).send({
      error: 'somthing wrong'
    })
  }
}
const find = async (req, res) => { 
  try {
    const search = req.query.search
    let filter = req.query.filter
    // let options = req.query.options  sort + pageNumber
    if (filter) {
      filter =JSON.parse(filter) 
      // {
      //   category: 'okafokdfoskf',
      //   sort:'price'
      // }
    } else {
      filter ={}
    }
    // filter = decodeURI(filter)
    console.log( req.query);
    // console.log(filter);
    // console.log(JSON.parse(filter));

    // console.log( filter);
    let products = []
    // filter = {
    //   page:1
    //   perPage: 10
    //   madeIn:
    //   name:
    // sortBy
    // }
    // .skip( pageNumber > 0 ? ( ( pageNumber - 1 ) * 10 ) : 0 )
    if (search) {
      console.log(search);
      products = await Product.find( {$text: {$search: search}}).populate('category').limit(10);

    } else {
      if (filter.sort) {

        let {sort} = filter
        delete filter.sort
        console.log('filter',filter);
        products = await Product.find(filter).populate('category').limit(10).sort(sort);
      } else {
        products = await Product.find( filter).populate('category').limit(10);
      }
     

    }
    res.json({
      products: products
    })
  } catch (err) {
    console.log(err);
    res.status(400).send({
      error: 'somthing wrong'
    })
  }
}
const findById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({ _id: id }).populate('category')
    res.json({
      product: product
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
    const data = req.body
    console.log(data);
    const product = await Product.findOneAndUpdate({ _id: id }, data)
    res.status(200).json({ data: product, message: 'updated' });
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
    const product = await Product.findByIdAndDelete(id);
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
  find,
  updateById,
  findById,
  deleteById
}