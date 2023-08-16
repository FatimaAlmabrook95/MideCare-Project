const {Category} = require('../models')

const create = async  (req, res) => {
  try {
    // let {name,madeIn,image} = req.body
    const category = await Category.create(req.body);
    res.json({
      category: category
    })
  } catch (err) {
    console.log(err);
    res.status(400).send({
      error: 'somthing wrong'
    })
  }
}
    const find = async  (req, res) => {
      try {
        const filter = req.params.filter || {};
        // filter = {
        //   page:1
        //   perPage: 10
        //   madeIn:
        //   name:
        // sortBy
        // }
        // .skip( pageNumber > 0 ? ( ( pageNumber - 1 ) * 10 ) : 0 )
        const categories = await Category.find().limit(10);
        res.json({
          categories: categories
        })
      } catch (err) {
        console.log(err);
        res.status(400).send({
          error: 'somthing wrong'
        })
      }
    }
    const findById  = async  (req, res) => {
      try {
        const id = req.params.id;
        const category = await Category.findOne({_id:id})
        res.json({
          category: category
        })
      } catch (err) {
        console.log(err);
        res.status(500).send({
          error: 'somthing wrong'
        })
      }
    }
   const  updateById = async  (req, res)=> {
      try {
        const id = req.params.id;
        const data = req.body
        console.log(data);
        const category = await Category.findOneAndUpdate({_id:id}, data)
        res.status(200).json({ data: category, message: 'updated' });
      } catch (err) {
        console.log(err);
        res.status(500).send({
          error: 'somthing wrong'
        })
      }
    }
    const  deleteById = async(req, res)=> {
      try {
        const id = req.params.id;
        const category = await Category.findByIdAndDelete(id);
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