import Cookies from 'js-cookie'
import { apiLogin } from './api'

const authService = {}
const tokenKey = 'token'

authService.authenticate = (email, password) => {
  return apiLogin
    .post('/', { email, password })
    .then((res) => res.data)
    .catch((err) => {
      throw err
    })
}

authService.getToken = () => {
  return Cookies.get(tokenKey)
}

authService.setToken = (token) => {
  return Cookies.set(tokenKey, token)
}

authService.removeToken = () => {
  return Cookies.remove(tokenKey)
}

export default authService
