import axios from 'axios'

const api = axios.create({
    baseURL: 'backend-url', /** set backend url */
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
    }
})


export default api;
