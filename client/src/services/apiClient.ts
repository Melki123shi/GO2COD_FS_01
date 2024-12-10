import axios, { CanceledError } from 'axios';

export default axios.create({
    baseURL: "/api",
    headers: {

    }
});

export { CanceledError };