import request from "@/utils/request"
import { Message } from "element-ui"

export default {
    namespaced: true,
    state: {
        goodsList: "",
        total: 0,
        pagenum: 1,
        goodsListById: ""
    },
    mutations: {
        getGoodsList(state, payload) {
            state.total = payload.total
            state.goodsList = payload.goodsList
        },
        changePagenum(state, payload) {
            state.pagenum = payload.result
        },
        getGoodsListById(state, payload) {
            state.goodsListById = payload.result
        },
    },
    actions: {
        async getGoodsList({ commit, state }) {
            const res = await request({
                url: "goods",
                method: "get",
                data: {
                    pagenum: state.pagenum,
                    pagesize: 10
                }
            })
            if (res.data.meta.status == 200) {
                commit("getGoodsList", { "total": res.data.data.total, "goodsList": res.data.data.goods })
                Message.success(res.data.meta.msg)
            } else {
                Message.error(res.data.meta.msg)
            }
        },
        async getGoodsById({ commit }, payload) {
            const res = await request({
                url: "goods/" + payload.result,
                method: "get"
            })
            if (res.data.meta.status == 200) {
                commit("getGoodsListById", { "result": res.data.data })
                Message.success(res.data.meta.msg)
            } else {
                Message.error(res.data.meta.msg)
            }
        },
        async searchGoodsList({ commit, state },payload) {
            const res = await request({
                url: "goods",
                method: "get",
                data: {
                    query:payload.result,
                    pagenum: state.pagenum,
                    pagesize: 10
                }
            })
            if (res.data.meta.status == 200) {
                commit("getGoodsList", { "total": res.data.data.total, "goodsList": res.data.data.goods })
                Message.success(res.data.meta.msg)
            } else {
                Message.error(res.data.meta.msg)
            }
        },
    }
}