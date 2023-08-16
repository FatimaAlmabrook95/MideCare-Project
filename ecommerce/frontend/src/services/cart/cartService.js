import api from '../api'


const findById = async (userId) => {
  const response = await api.get(`users/${userId}/carts`)
  return response.data.product
}
const create = async (cart) => {
  const response = await api.post(`users/${cart.user}/carts`, cart)
  return response.data
}

const update = async (cart) => {
  const response = await api.put(`users/${cart.user}/carts`, cart)
  return response.data
}
const deleteCart = async (cart) => {
  const response = await api.delete(`users/${cart.user}/carts`)
  return response.data
}
const cartService = {
  create,
  findById,
  update,
  deleteCart
}

export default cartService
