const {User} = require('../models')

    const find = async  (req, res) => {
      try {
        const filter = req.params.filter;
        const users = await User.find(filter);
        res.json({
          users: users
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
        const user = await User.findOne({_id:id}).select('-password')
        res.json({
          user: user
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
        const user = await User.findByIdAndUpdate(id, { data })
        user.password = undefined
        res.status(200).json({ data: user, message: 'updated' });
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
        const user = await User.findByIdAndDelete(id);
        res.status(200).json({ data: id, message: 'deleted' });
      } catch (err) {
        console.log(err);
        res.status(500).send({
          error: 'somthing wrong'
        })
      }
    }
  
  
  module.exports = {
    find,
    updateById,
    findById,
    deleteById
  }