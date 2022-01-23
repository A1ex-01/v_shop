import request from "@/utils/request"
import { Message } from "element-ui";

export default {
    namespaced: true,
    state: {
        rolesList: "",
        myTree: "",
        meau:""
    },
    mutations: {
        getRoles(state, payload) {
            state.rolesList = payload.result
        },
        getMyTree(state, payload) {
            state.myTree = payload.result
        },
        getMyMeau(state,payload){
            state.meau = payload.result
        }
    },
    actions: {
        async getRoles({ commit }) {
            const res = await request({
                url: "roles",
                method: "get",
            })
            if (res.data.meta.status == 200) {
                commit("getRoles", { "result": res.data.data })
                Message.success(res.data.meta.msg)
            } else {
                Message.success(res.data.meta.msg)
            }
        },
        async updateRoles({ commit }) {
            const res = await request({
                url: "roles",
                method: "get",
            })
            if (res.data.meta.status == 200) {
                commit("getRoles", { "result": res.data.data })
            } else {
                Message.error(res.data.meta.msg)
            }
        },
        async addRole({ dispatch }, payload) {
            (payload)
            const res = await request({
                url: "roles",
                method: "post",
                data: {
                    roleName: payload.roleName,
                    roleDesc: payload.roleDesc,
                }
            })
            if (res.data.meta.status == 201) {
                dispatch("updateRoles")
                Message.success(res.data.meta.msg)

            } else {
                Message.error(res.data.meta.msg)

            }
        },
        async changeRole({ dispatch }, payload) {
            (payload)
            const res = await request({
                url: "roles/" + payload.id,
                method: "put",
                data: {
                    roleName: payload.roleName,
                    roleDesc: payload.roleDesc,
                }
            })
            if (res.data.meta.status == 200) {
                dispatch("updateRoles")
                Message.success(res.data.meta.msg)

            } else {
                Message.error(res.data.meta.msg)

            }
        },
        async deleteRole({ dispatch }, payload) {
            (payload)
            const res = await request({
                url: "roles/" + payload.id,
                method: "delete",
            })
            if (res.data.meta.status == 200) {
                dispatch("updateRoles")
                Message.success(res.data.meta.msg)

            } else {
                Message.error(res.data.meta.msg)

            }
        },
        async getAllRole({ commit }) {
            const res = await request({
                url: "rights/tree",
                method: "get",
            })
            if (res.data.meta.status == 200) {
                commit("getMyTree", { "result": res.data.data })
                Message.success(res.data.meta.msg)

            } else {
                Message.error(res.data.meta.msg)

            }
        },
        async giveAuthorize({ dispatch }, payload) {
            const res = await request({
                url: "roles/" + payload.id + "/rights",
                method: "post",
                data: {
                    rids: payload.rid
                }
            })
            if (res.data.meta.status == 200) {
                dispatch("updateRoles")
                Message.success(res.data.meta.msg)

            } else {
                Message.error(res.data.meta.msg)

            }
        },
        async deleteAuthorize({ dispatch }, payload) {
            const res = await request({
                url: "roles/" + payload.roleId + "/rights/" + payload.rightId,
                method: "delete",
            })
            if (res.data.meta.status == 200) {
                dispatch("updateRoles")
                Message.success(res.data.meta.msg)

            } else {
                Message.error(res.data.meta.msg)

            }
        },
        async getMeau({commit}) {
            const res = await request({
                url: "rights/list",
                method: "get",
            })
            if (res.data.meta.status == 200) {
                commit("getMyMeau",{"result":res.data.data})
                Message.success(res.data.meta.msg)
            } else {
                Message.error(res.data.meta.msg)

            }
        },
    }
}