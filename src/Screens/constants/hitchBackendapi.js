import axios from 'axios';

const serverUrl = 'https://hitchin-server.herokuapp.com';
// const serverUrl = 'http://127.0.0.1:5000/'

const http = axios.create({
    baseURL: serverUrl
});

export function getAxios(token) {
  return axios.create({
    baseURL: serverUrl,
    headers: {"Authorization": " JWT " + token}
  })

}

export { serverUrl, http}
