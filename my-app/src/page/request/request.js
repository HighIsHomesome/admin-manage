import axios from 'axios'

// 配置
const axiosOption = {
    baseURL:'https://123.60.163.82:8081/api/',
    //baseURL:'https://localhost:8081/api/',
    timeout:50000,

}

// 生成一个axios的单例
const instance = axios.create(axiosOption)

// 请求拦截器
instance.interceptors.request.use(function (config){
    if(localStorage.getItem("token")!=null){
		console.log(localStorage.getItem("token"))
        config.headers['authorization'] = localStorage.getItem("token")
    }
    
    return config
},function (error){
    return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(function (response){
    return response.data
},function (error){
    return Promise.reject(error)
})

export default instance