import request from "@/utils/request"
import { Message } from "element-ui"
export default {
    namespaced: true,
    state: {
        userInfoList: null,
        pagenum: 1,
        total: 0
    },
    mutations: {
        getList(state, payload) {
            state.userInfoList = payload.result.users;
            state.total = payload.result.total
        },
        updateList(state, payload) {
            state.userInfoList = payload.result.users;
            state.total = payload.result.total
        },
        changePagenum(state, payload) {
            state.pagenum = payload.result
        },
        fillteredList() {

        }
    },
    actions: {
        async getUserInfoList({ commit, state }) {
            const res = await request({
                url: "users",
                method: "get",
                data: {
                    pagenum: state.pagenum,
                    pagesize: 5
                }
            })
            if (res.data.meta.status == 200) {
                commit("getList", { "result": res.data.data })
                Message.success(res.data.meta.msg)
            } else {
                Message.error(res.data.meta.msg)
            }
        },
        async getFillterList({ commit, state }, payload) {
            commit("changePagenum", { result: 1 })
            const res = await request({
                url: "users",
                method: "get",
                data: {
                    query: payload.result,
                    pagenum: state.pagenum,
                    pagesize: 5
                }
            })
            if (res.data.meta.status == 200) {
                commit("getList", { "result": res.data.data })
                Message.success(res.data.meta.msg)
            } else {
                Message.error(res.data.meta.msg)
            }
        },
        async updateInfoList({ commit, state }) {
            const res = await request({
                url: "users",
                method: "get",
                data: {
                    pagenum: state.pagenum,
                    pagesize: 5
                }
            })
            if (res.data.meta.status == 200) {
                commit("updateList", { "result": res.data.data })
            } else {
                Message.error(res.data.meta.msg)
            }
        },
        async changeState({ dispatch }, payload) {
            const res = await request({
                url: "users/" + payload.id + "/state/" + payload.state,
                method: "put"
            })
            if (res.data.meta.status == 200) {
                dispatch("updateInfoList");
                Message.success(res.data.meta.msg)
            } else {
                Message.error(res.data.meta.msg)

            }
        },
        async changeInfo({ dispatch }, payload) {
            const res = await request({
                url: "users/" + payload.id,
                method: "put",
                data: {
                    "email": payload.email,
                    "mobile": payload.mobile
                }
            })
            if (res.data.meta.status == 200) {
                dispatch("updateInfoList");
                Message.success(res.data.meta.msg)
            } else {
                Message.error(res.data.meta.msg)
            }
        },
        async addUser({ dispatch }, payload) {
            const res = await request({
                url: "users",
                method: "post",
                data: {
                    username: payload.username,
                    password: payload.password,
                    email: payload.email,
                    mobile: payload.mobile
                }
            })
            if (res.data.meta.status == 201) {
                dispatch("updateInfoList");
                Message.success(res.data.meta.msg)
            } else {
                Message.error(res.data.meta.msg)
            }

        },
        async deleteUser({ dispatch }, payload) {
            const res = await request({
                url: "users/" + payload.id,
                method: "delete",
            })
            if (res.data.meta.status == 200) {
                dispatch("updateInfoList");
                Message.success(res.data.meta.msg)
            } else {
                Message.error(res.data.meta.msg)
            }

        },
    }
}