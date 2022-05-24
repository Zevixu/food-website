import axios from 'axios';

const baseURL = '/api/';

export function post(url, data) {
    const headers = { 'Content-Type': 'application/json' }
    return axios({
        url,
        method: 'post',
        data,
        headers,
        baseURL,
    });
}

export function get(url) {
    return axios.get(url, { baseURL });
}
