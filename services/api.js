import axios from 'axios'
import config from './config'

const api = axios.create({
  baseURL: config.apiURL,
})
const apiLogin = axios.create({
  baseURL: 'https://reqres.in/api/login',
})
export { api, apiLogin }
