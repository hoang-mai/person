import axios from "axios"

axios.defaults.baseURL = "http://localhost:8080"


export const post = (path, body, auth = false) => {
    const config = auth
        ? { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        : {};
    
    
    return axios.post(path, body, config);
};