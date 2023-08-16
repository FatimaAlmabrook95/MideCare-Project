import api from '../api'

// Register user
const register = async (userData) => {
  const response = await api.post('register', userData)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await api.post('login', userData)

  // if (response.data) {
  //   localStorage.setItem('user', JSON.stringify(response.data))
  // }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login,
}

export default authService
