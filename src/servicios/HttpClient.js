import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_URL_BASE;

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const requestGenerico = {
    get: async (url) => {
        const response = await axios.get(url);
        return response;
    },
    post: async (url, body) => {
        const response = await axios.post(url, body);
        return response;
    },
    put: async (url, body) => {
        const response = await axios.put(url, body);
        return response;
    },
    delete: async (url) => {
        const response = await axios.delete(url);
        return response;
    }
}

export default requestGenerico;