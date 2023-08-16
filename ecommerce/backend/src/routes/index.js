
const {AuthenticationController,CategoryController,UserController,ProductController, ImageController,CartController} = require('../controllers')
const Validator = require('../middlewares/validator.middleware')
const authenticated = require('../middlewares/authentication.middleware')
const isOwner = require('../middlewares/isOwner.middleware')
const {storageUpload} = require('../middlewares/multer.middleware')
const routes =  (app) => {
  /* GET home page. */
app.get('/', function(req, res, next) {
    res.send('index');
  });
  


  /* GET users listing. */
app.get('/users',authenticated(), function(req, res, next) {
    res.send('users');
  });
app.post('/register', Validator('register'),AuthenticationController.register);
app.post('/login', Validator('login'),AuthenticationController.login);

/* Categories routes */
app.post('/categories', storageUpload, Validator('category'),CategoryController.create);
app.get('/categories',CategoryController.find);
app.get('/categories/:id',CategoryController.findById);
app.put('/categories/:id',Validator('updateCategory'),CategoryController.updateById);
app.delete('/categories/:id',CategoryController.deleteById);

/* Products routes */
app.post('/products', Validator('product'),ProductController.create);
app.get('/products',ProductController.find);
app.get('/products/:id',ProductController.findById);
app.put('/products/:id',authenticated(),isOwner('Product'),Validator('updateProduct'),ProductController.updateById);
app.delete('/products/:id',ProductController.deleteById);

/* Images routes */
app.post('/images', storageUpload,ImageController.create);

/* Images routes */
app.post('/carts', CartController.create);

  
}
module.exports=routes