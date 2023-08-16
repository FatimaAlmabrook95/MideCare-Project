const {User} = require('../models')
const {hash,compare} = require('bcrypt')
const {generateToken} = require('../services/authentication.service')


  const register =  async  (req, res)=> {
      try {
        const {email, password,phone} = req.body
        const findUser = await User.findOne({ email: email });
        if (findUser) {
          res.status(409).send({
            error:`This email ${email} already exists`
          })
          return
        }

        const hashedPassword = await hash(password, 10);
        const createUserData = await User.create({ email,phone, password: hashedPassword });
        const sentUser = {id:createUserData.id}
        res.send({
          user: sentUser,
          token: await generateToken(sentUser)
        })
      } catch (err) {
        console.log(err);
        res.status(400).send({
          error: 'somthing wrong'
        })
      }
    }
   const  login = async  (req, res)=> {
      try {
        const {email, password} = req.body
        const user = await User.findOne({
            email: email
        })
        if (!user) {
          return res.status(403).send({
            error: 'The login information was incorrect'
          })
        }
        const isPasswordMatching = await compare(password, user.password);
        if (!isPasswordMatching){ 
          console.log('isPasswordMatching');
          return res.status(403).send({
            error: 'The login information was incorrect'
          })
        }
        const sentUser = {id:user.id}
        res.send({
          user: sentUser,
          token: await generateToken(sentUser)
        })
      } catch (err) {
        console.log(err);
        res.status(500).send({
          error: 'An error has occured trying to log in'
        })
      }
    }

  module.exports = {
    register,
     login,
  }