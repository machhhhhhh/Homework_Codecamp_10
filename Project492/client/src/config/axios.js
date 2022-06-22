import { notification } from 'antd';
import axios from 'axios';
import LocalStorageservice from '../service/LocalStorageService'

axios.defaults.baseURL = "http://localhost:5000";

axios.interceptors.request.use(
    config => {
        if(config.url.includes('/login') || config.url.includes('/register')){ // login page and register page should not add Header
            return config
        }

        const token = LocalStorageservice.getToken()
        if (token){
            config.headers["Authorization"] = `Bearer ${token}`
        }
        return config
        
    },
    err => {
        Promise.reject(err)
    }
)

axios.interceptors.response.use(
    response => {
        return response
    },
    err => {
        if (err.response.status === 401 && err.response){
            LocalStorageservice.removeToken()
            window.location.reload()
            notification.error({
                message : 'Please login again'
            })
            return Promise.reject(err)
        }
        return Promise.reject(err)
    }
)

export default axios;