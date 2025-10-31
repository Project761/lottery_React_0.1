// Ensure Axios is loaded
import axios from 'axios';
console.log(window.axios);
if (typeof window.axios === 'undefined') {
    throw new Error('Axios is not loaded. Make sure the Axios CDN is included in index.html');
}

// Create Axios instance with default config
const api = window.axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Request interceptor
api.interceptors.request.use(
    config => {
        // Add auth token if needed
        // const token = localStorage.getItem('token');
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    error => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
    response => response.data,
    error => {
        if (error.response) {
            console.error('API Error:', {
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers
            });
            
            if (error.response.status === 401) {
                // Handle unauthorized
                // localStorage.removeItem('token');
                // window.location.href = '/login';
            }
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Request setup error:', error.message);
        }
        return Promise.reject(error);
    }
);

// Make it globally available
window.api = api;

// Export the configured instance
export default api;
