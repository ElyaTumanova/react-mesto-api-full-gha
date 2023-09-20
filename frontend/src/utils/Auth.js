import { checkResponse } from "./checkResponse";

export const BASE_URL = 'https://elya.mesto.nomoredomainsrocks.ru';

function request(url, options) {
  return fetch(url, options).then(checkResponse)
}

export function register (email, password) {
  return request(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: password,
      email: email})
  })
};

export function login (email, password) {
  return request(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: password,
      email: email})
  })
};

export function authorize (token) {
  return request(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`
    }
  })
}


