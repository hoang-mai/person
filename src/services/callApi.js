import axios from "axios"
import { refresh_token } from "./apiEndpoint"


axios.defaults.baseURL = "http://localhost:8080"

const api= axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-type": "application/json"
    }
})

api.interceptors.response.use(
    (response)=> {
        console.log(response)
        return response
    },
    async (error)=>{
    
        const originalRequest = error.config
        
        console.log(originalRequest.url)
        if(error.response.status === 401 && originalRequest.url === refresh_token){
            localStorage.clear()
            window.location.href = "/login"
            return Promise.reject(new Error(error))
        }
        originalRequest._retry = originalRequest._retry || false
        if(error.response.status === 401 && !originalRequest._retry){
            originalRequest._retry = true
            const res = await api.post(refresh_token, {}, {headers: {Authorization: `Bearer ${localStorage.getItem("refreshToken")}`}})
            if (res.status === 200) {
                console.log(res)
                localStorage.setItem("accessToken", res.data.data)
                originalRequest.headers['Authorization'] = `Bearer ${localStorage.getItem("accessToken")}`
                return api(originalRequest)
            }
        }
        return Promise.reject(new Error(error.message || error))
    }
)
export const post = (path, body, auth = false) => {
    const config = auth
        ? { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } }
        : {};
    
    
    return api.post(path, body, config);
};
export const get =(path,param,auth=true)=>{
    const config = {
        params: param, // Thêm params
        ...(auth && {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }),
      };
    return api.get(path,config)
}