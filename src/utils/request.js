import axios from "axios";
import {getCookie} from "./cookie"
import qs from "qs"

// 创建vue实例
const ins = axios.create({
    timeout:"20000", // 超时取消
    baseURL:"https://api.naccl.top/vue/shop/api/private/v1/" // 项目基准地址
});
// axios拦截器
ins.interceptors.request.use((config) => {
    // 携带数据请求的配置
    config.headers.common['Authorization'] = getCookie('token');
    return config;
},(error)=>{
    console.log("error");
    return Promise.reject(error);
});

// 封装数据请求
export default function request (config) {
    if(!config) {
        alert("不能传入空值");
        return;
    }
    const {url,method = "GET",data,postType="json" } = config;
    if(!url){
        alert("url必须传入");
        return;
    }
    switch (method.toUpperCase()) {
        case "GET":
            return ins.get(url,{ params: data })
        case "POST": 
            if (postType == "json"){
                return ins.post(url,data);
            }
            if (postType == "form"){
                ins.post(url,qs.stringify(data));
                return 
            }
            if (postType == "file"){
                // FormData 参数转换
                const params = new FormData();
                for(let key in data) {
                    params.append(key,data[key]);
                }
                return ins.post(url,params);
            }
            return
        case "PUT":
            return ins.put(url,data);
        case "DELETE":
            return ins.delete(url,{data});
        default:
            return ins(config);
    }

}