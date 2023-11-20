import axios from 'axios';
import { getToken } from '../auth';

export const BASE_URL='http://localhost:8080/api/v1';

export const  myAxios = axios.create({
    baseURL: BASE_URL
});

export const privateAxios = axios.create({
    baseURL: BASE_URL,
});

privateAxios.interceptors.request.use(
    (config) => {
        const token = getToken();

        if (token) {
            config.headers = config.headers || {}; // create headers object if it doesn't exist
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);