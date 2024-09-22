import axios from 'axios'
import { BASE_URL } from '../constants'

interface LoginResponse {
  token: string
}

interface LoginRequest {
  username: string
  password: string
}

interface SignupRequest {
  email: string
  username: string
  password: string
}

interface SignupResponse {
  id: number
  email: string
  username: string
  password: string
  name: {
    firstname: string
    lastname: string
  }
  address: {
    city: string
    street: string
    number: number
    zipcode: string
    geolocation: {
      lat: string
      long: string
    }
  }
  phone: string
}

export const UserLogin = (userAuth: LoginRequest): Promise<LoginResponse> =>
  axios
    .post(`${BASE_URL}/auth/login`, JSON.stringify(userAuth))
    .then((res: { data: LoginResponse }) => res.data)

export const Signup = (userInfo: SignupRequest): Promise<SignupResponse> =>
  axios.post(`${BASE_URL}/users`, JSON.stringify(userInfo))
