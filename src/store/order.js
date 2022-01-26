import request from "@/utils/request"
import { Message } from "element-ui"

export default {
    namespaced: true,
    state: {
        pagenum: 1,
        orderList: "",
        total: 0,
        localOrder:"",
        img:[]
    },
    mutations: {
        getOrder(state, payload) {
            state.orderList = payload.result.goods
            state.total = payload.result.total
        },
        changePage(state, payload) {
            state.pagenum = payload.result
        },
        getLocalOrder(state, payload) {
            state.localOrder = payload.result
        },
        getImage(state, payload) {
            state.img.push(payload.result)
        },
        initImag(state){
            state.img = []
        }
    },
    actions: {
        async getOrderList({ commit, state }) {
            const res = await request({
                url: "orders",
                method: "get",
                data: {
                    pagenum: state.pagenum,
                    pagesize: 10
                }
            })
            if (res.data.meta.status == 200) {
                commit("getOrder", { result: res.data.data })
                Message.success(res.data.meta.msg)
            } else {
                Message.error(res.data.meta.msg)
            }
        },
        async searchOrderList({ commit, state }, payload) {
            state.pagenum = 1;
            const res = await request({
                url: "orders",
                method: "get",
                data: {
                    consignee_addr: payload.result,
                    pagenum: state.pagenum,
                    pagesize: 10
                }
            })
            if (res.data.meta.status == 200) {
                commit("getOrder", { result: res.data.data })
                Message.success(res.data.meta.msg)
            } else {
                Message.error(res.data.meta.msg)
            }
        },
        async getLocalOrderInfo({ dispatch,commit }, payload) {
            const res = await request({
                url: "orders/"+payload.result,
                method: "get",
            })
            if (res.data.meta.status == 200) {
                commit("getLocalOrder",{result:res.data.data})
                commit("initImag",{result:res.data.data})
                for(let i=0;i<res.data.data.goods.length;i++){
                    dispatch("getorderImage",{result:res.data.data.goods[i].goods_id})
                }
                Message.success(res.data.meta.msg)
            } else {
                Message.error(res.data.meta.msg)
            }
        },
        async getorderImage( {commit},payload) {
            const res = await request({
                url: "goods/"+payload.result,
                method: "get",
            })
            if (res.data.meta.status == 200) {
                commit("getImage",{result:res.data.data})
                Message.success(res.data.meta.msg)
            } else {
                Message.error(res.data.meta.msg)
            }
        }
    }
}