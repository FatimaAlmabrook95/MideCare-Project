const register = require('./register.validator')
const login = require('./login.validator')
const category = require('./category.validator')
const updateCategory = require('./category.update.validator')
const product = require('./product.validator')
const updateProduct = require('./product.update.validator')

module.exports = {
    register,
    login,
    category,
    updateCategory,
    product,
    updateProduct
}