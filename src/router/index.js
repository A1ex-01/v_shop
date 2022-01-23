import { getCookie } from '@/utils/cookie'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    component: () => import("../views/IndexPage"),
    redirect: "welcome"
  },
  {
    path: "/login",
    component: () => import("../views/LoginPage")
  },
  {
    path: "/welcome",
    component: () => import("../views/IndexPage"),
    children: [
      {
        path: "/",
        redirect:"userlist/userlist"
      },
      {
        path: "userlist/userlist",
        component: () => import("../components/user_manage/UserList"),
      },
      {
        path: "permiss/permiss",
        component: () => import("../components/permiss_manage/PermissList"),
      },
      {
        path: "permiss/role",
        component: () => import("../components/permiss_manage/RoleInfo"),
      },
      {
        path: "order/order",
        component: () => import("../components/order_manage/OrderList"),
      },
      {
        path: "goods/goods",
        component: () => import("../components/goods_manage/GoodsList"),
      },
      {
        path: "goods/goods/:id",
        component: () => import("../components/goods_manage/ResetGoods"),
      },
      {
        path: "goods/type",
        component: () => import("../components/goods_manage/GoodsType"),
      },
      {
        path: "goods/typeinfo",
        component: () => import("../components/goods_manage/TypeInfo"),
      },
      {
        path: "datas/datas",
        component: () => import("../components/datas_manage/DataAllShow"),
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 登录前置守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next() // 全等就放行
  const tokenStr = getCookie('token');
  if (!tokenStr) return next('/login') //如果没有token就强制跳转到登录页面 
  next()
})

// 路由重复跳转处理
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
