import request from "@/utils/request"
import { setCookie } from "@/utils/cookie";
import router from "../router";
import { Message } from "element-ui";
export default {
    namespaced:true,
    state:{
        userInfo:null
    },
    mutations:{
        getuserInfo(state,payload){
            state.userInfo = payload.res;
        }
    },
    actions:{
        async login({commit},val){
            const res = await request({
                url:"/login",
                method:"post",
                data:val
            })
            if(res.data.meta.status == 200){
            await commit("getuserInfo",{"res":res.data.data});
            setCookie("token",res.data.data.token,7);
            setCookie("email",res.data.data.email,7);
            setCookie("mobile",res.data.data.mobile,7);
            setCookie("rid",res.data.data.rid,7);
            setCookie("username",res.data.data.username,7);
            setCookie("id",res.data.data.id,7);
            Message.success(res.data.meta.msg);
            router.push("/welcome");
            }else{
                Message.error(res.data.meta.msg);
            }
        }
    }
}