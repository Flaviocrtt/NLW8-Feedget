import axios from "axios";

export const api = axios.create({
    baseURL: 'https://feedget-server-two.up.railway.app'
});