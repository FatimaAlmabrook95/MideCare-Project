require('dotenv').config()
const config = {
  port: process.env.PORT || 3001,
  db: {
    url: process.env.DB_URL || "mongodb+srv://fatima:aaaaa@cluster0.tn4qmdn.mongodb.net/Project0" ,
    host:process.env.DB_HOST || 'localhost',
    port:process.env.DB_PORT || 27017,
    database:process.env.DB_DATABASE || 'ecommerce',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  },
     
    
  authentication: {
    jwtSecret:  process.env.JWT_SECRET || 'secret',
    expiresIn: 60*60 ,
  }
}
module.exports = config

