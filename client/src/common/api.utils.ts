import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = 'http://localhost:3000';
const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const apiRequest = async (config: AxiosRequestConfig) => {
    try {
        const response = await instance(config);
        return response.data;
    } catch (error) {
        console.error('API request error:', error);
        throw error;
    }
};
