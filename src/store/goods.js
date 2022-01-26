import request from "@/utils/request"
import { Message } from "element-ui"

export default {
    namespaced: true,
    state: {
        goodsList: "",
        total: 0,
        pagenum: 1,
        goodsListById: "",
        categories: "",
        manyAttr: [],
        onlyAttr: [],
        catPagenum:1,
        catTotal:0
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
        getCategories(state, payload) {
            state.categories = payload.result.result
            state.catTotal = payload.result.total
        },
        getMyManyAttr(state, payload) {
            state.manyAttr = payload.result
        },
        getMyOnlyAttr(state, payload) {
            state.onlyAttr = payload.result
        },
        changeCatPage(state,payload){
            state.catPagenum = payload.result

        }
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
        async searchGoodsList({ commit, state }, payload) {
            const res = await request({
                url: "goods",
                method: "get",
                data: {
                    query: payload.result,
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
        async getCategoriesList({ commit,state }) {
            const res = await request({
                url: "categories",
                method: "get",
                data: {
                    pagenum: state.catPagenum,
                    pagesize: 5
                }
            })
            if (res.data.meta.status == 200) {
                console.log(res.data.data)
                commit("getCategories", { result: res.data.data })
                Message.success(res.data.meta.msg)
            } else {
                Message.error(res.data.meta.msg)
            }
        },
        async getManyAttr({ commit }, payload) {
            const res = await request({
                url: "categories/" + payload.result + "/attributes",
                method: "get",
                data: {
                    sel: ["many"]
                }
            })
            if (res.data.meta.status == 200) {
                commit("getMyManyAttr", { result: res.data.data })
                Message.success(res.data.meta.msg)
            } else {
                Message.error(res.data.meta.msg)
            }
        },
        async getOnlyAttr({ commit }, payload) {
            const res = await request({
                url: "categories/" + payload.result + "/attributes",
                method: "get",
                data: {
                    sel: ["only"]
                }
            })
            if (res.data.meta.status == 200) {
                commit("getMyOnlyAttr", { result: res.data.data })
                Message.success(res.data.meta.msg)
            } else {
                Message.error(res.data.meta.msg)
            }
        },
        async deleteAttr({ dispatch }, payload) {
            const res = await request({
                url: "categories/" + payload.cat_id + "/attributes/" + payload.attr_id,
                method: "delete",
            })
            if (res.data.meta.status == 200) {
                dispatch("getOnlyAttr", { result: payload.cat_id })
                dispatch("getManyAttr", { result: payload.cat_id })
                Message.success(res.data.meta.msg)
            } else {
                Message.error(res.data.meta.msg)
            }
        },
        async deleteVals({ dispatch }, payload) {
            const res = await request({
                url: "categories/" + payload.cat_id + "/attributes/" + payload.attr_id,
                method: "put",
                data: payload.info
            })
            if (res.data.meta.status == 200) {
                console.log(dispatch);
                // dispatch("getOnlyAttr",{result:payload.cat_id})
                // dispatch("getManyAttr",{result:payload.cat_id})
                Message.success(res.data.meta.msg)
            } else {
                Message.error(res.data.meta.msg)
            }
        },
        async addOnlyValue({ dispatch }, payload) {
            const res = await request({
                url: "categories/" + payload.cat_id + "/attributes",
                method: "post",
                data: {
                    attr_name: payload.attr_name,
                    attr_sel: payload.attr_sel
                }
            })
            if (res.data.meta.status == 201) {
                dispatch("getOnlyAttr", { result: payload.cat_id })
                Message.success(res.data.meta.msg)
            } else {
                Message.error(res.data.meta.msg)
            }
        },
        async addManyValue({ dispatch }, payload) {
            const res = await request({
                url: "categories/" + payload.cat_id + "/attributes",
                method: "post",
                data: {
                    attr_name: payload.attr_name,
                    attr_sel: payload.attr_sel
                }
            })
            if (res.data.meta.status == 201) {
                dispatch("getManyAttr", { result: payload.cat_id })
                Message.success(res.data.meta.msg)
            } else {
                Message.error(res.data.meta.msg)
            }
        },
        async addMyStaticValue({ dispatch }, payload) {
            const res = await request({
                url: "categories/" + payload.id + "/attributes/"+payload.attrId,
                method: "put",
                data: {
                    attr_name: payload.attr_name,
                    attr_sel: payload.attr_sel
                }
            })
            if (res.data.meta.status == 200) {
                dispatch("getOnlyAttr", { result: payload.id })
                Message.success(res.data.meta.msg)
            } else {
                Message.error(res.data.meta.msg)
            }
        },
        async addMyActiveValue({ dispatch }, payload) {
            const res = await request({
                url: "categories/" + payload.id + "/attributes/"+payload.attrId,
                method: "put",
                data: {
                    attr_name: payload.attr_name,
                    attr_sel: payload.attr_sel
                }
            })
            if (res.data.meta.status == 200) {
                dispatch("getManyAttr", { result: payload.id })
                Message.success(res.data.meta.msg)
            } else {
                Message.error(res.data.meta.msg)
            }
        },
        async deleteType({ dispatch }, payload) {
            const res = await request({
                url: "categories/"+payload.result,
                method: "delete",
            })
            if (res.data.meta.status == 200) {
                dispatch("getCategoriesList")
                Message.success(res.data.meta.msg)
            } else {
                Message.error(res.data.meta.msg)
            }
        },
        async updateType({ dispatch }, payload) {
            const res = await request({
                url: "categories/"+payload.id,
                method: "put",
                data:{
                    cat_name:payload.cat_name
                }
            })
            if (res.data.meta.status == 200) {
                dispatch("getCategoriesList")
                Message.success(res.data.meta.msg)
            } else {
                Message.error(res.data.meta.msg)
            }
        },
        async addTypeLevel({ dispatch }, payload) {
            const res = await request({
                url: "categories",
                method: "post",
                data:{
                    cat_pid:payload.cat_pid,
                    cat_name:payload.cat_name,
                    cat_level:payload.cat_level
                }
            })
            if (res.data.meta.status == 201) {
                dispatch("getCategoriesList")
                Message.success(res.data.meta.msg)
            } else {
                Message.error(res.data.meta.msg)
            }
        }
    }
}