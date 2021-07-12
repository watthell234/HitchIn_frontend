import axios from 'axios';

const serverUrl = 'https://hitchin-server.herokuapp.com';
// const serverUrl = 'http://127.0.0.1:5000/';

export const http = axios.create({
    baseURL: serverUrl
});

export function http_jwt(token) {
  return axios.create({
    baseURL: serverUrl,
    headers: {"Authorization": " JWT " + token}
  })

}
