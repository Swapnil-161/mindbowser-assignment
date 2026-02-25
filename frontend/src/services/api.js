import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Add a response interceptor to handle global errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message || 'Something went wrong. Please try again.';
        // Don't show toast for auto-login failures on /auth/me
        if (!(error.config.url.endsWith('/auth/me') && error.response?.status === 401)) {
            toast.error(message);
        }
        return Promise.reject(error);
    }
);

export default api;
