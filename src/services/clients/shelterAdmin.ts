import axios, { AxiosInstance } from 'axios';


// const DEV_URL = 'https://admin-system-shelterpaws-backend.onrender.com';
const DEV_URL = 'https://admin-system-shelterpaws-backend.onrender.com';


const shelterAdmin: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_SEREVER || DEV_URL,
});

export { shelterAdmin };
