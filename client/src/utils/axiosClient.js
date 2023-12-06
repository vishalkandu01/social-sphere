import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:4000',
    withCredentials: true,
})

export default axiosClient; 