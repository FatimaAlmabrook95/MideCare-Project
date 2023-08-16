import api from '../api'

// Register user
const index = async () => {
  const response = await api.get('categories')
  return response.data
}

const categoryService = {
  index,
}

export default categoryService
