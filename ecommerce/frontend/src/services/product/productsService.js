import api from '../api'

// Register user
const index = async ({search,filter}) => {
  if (search) {
    const response = await api.get('products', { params: { search: search } })
    return response.data.products
  }
  if (filter) {
    const response = await api.get('products', { params: { filter: JSON.stringify( filter) } })
    return response.data.products
  }
  
}
const findById = async ({id}) => {
    const response = await api.get(`products/${id}`)
    return response.data.product
}
const create = async (product) => {
  const response = await api.post('products',product)
  return response.data
}
const productsService = {
  index,
  create,
  findById
}

export default productsService
