<template>
  <div class="app">
    <el-container style="height: 100%">
      <el-header class="header">
        <div class="left">
          <img
            src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-ba46750a-9919-4a60-8473-439618d2c95d/83c12dbd-280b-41f7-b4fb-1cbddd4f13a8.png"
          />
          <span>电商后台管理系统</span>
        </div>
        <div class="right">
          <span>当前用户：{{ username }}</span>
          <el-button type="info" plain class="userbtn" @click="exit"
            >退出</el-button
          >
        </div>
      </el-header>
      <el-container>
        <el-aside :width="asideWidth">
          <div class="meau_flag" @click="isAside">
            <i class="el-icon-s-fold"></i>
          </div>
          <el-menu
            default-active="1-1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#333744"
            text-color="#fff"
            active-text-color="#ffd04b"
            :collapse="isCollapse"
          >
            <el-submenu index="1">
              <template slot="title"
                ><i class="el-icon-user-solid"></i>
                <span class="rightMove">用户管理</span>
              </template>
              <el-menu-item
                index="1-1"
                @click="goRouter('/welcome/userlist/userlist')"
                >用户列表</el-menu-item
              >
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"
                ><i class="el-icon-s-grid"></i>
                <span class="rightMove">权限管理</span></template
              >
              <el-menu-item
                index="2-1"
                @click="goRouter('/welcome/permiss/permiss')"
                >角色列表</el-menu-item
              >
              <el-menu-item
                index="2-2"
                @click="goRouter('/welcome/permiss/role')"
                >权限列表</el-menu-item
              >
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"
                ><i class="el-icon-s-management"></i>
                <span class="rightMove">商品管理</span></template
              >
              <el-menu-item
                index="3-1"
                @click="goRouter('/welcome/goods/goods')"
                >商品列表</el-menu-item
              >
              <el-menu-item index="3-2" @click="goRouter('/welcome/goods/type')"
                >分类列表</el-menu-item
              >
              <el-menu-item
                index="3-3"
                @click="goRouter('/welcome/goods/typeinfo')"
                >商品分类</el-menu-item
              >
            </el-submenu>
            <el-submenu index="4">
              <template slot="title"
                ><i class="el-icon-s-order"></i>
                <span class="rightMove">订单管理</span></template
              >
              <el-menu-item
                index="4-1"
                @click="goRouter('/welcome/order/order')"
                >订单列表</el-menu-item
              >
            </el-submenu>
            <el-submenu index="5">
              <template slot="title"
                ><i class="el-icon-s-data"></i>
                <span class="rightMove">数据统计</span></template
              >
              <el-menu-item
                index="5-1"
                @click="goRouter('/welcome/datas/datas')"
                >数据报表</el-menu-item
              >
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <div>
            <el-breadcrumb
              separator-class="el-icon-arrow-right"
              style="margin-bottom: 20px"
            >
              <el-breadcrumb-item>首页</el-breadcrumb-item>
              <el-breadcrumb-item>{{ firstLab }}</el-breadcrumb-item>
              <el-breadcrumb-item>{{ secondLab }}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { delCookie, getCookie } from "@/utils/cookie";
export default {
  data() {
    return {
      res: null,
      isCollapse: false,
      asideWidth: "201px",
      firstLab: "用户管理",
      secondLab: "用户列表",
    };
  },
  computed: {
    username() {
      const user = getCookie("username");
      return user;
    },
  },
  mounted() {},
  methods: {
    goRouter(val) {
      switch (val) {
        case "/welcome/userlist/userlist":
          this.firstLab = "用户管理";
          this.secondLab = "用户列表";
          break;
        case "/welcome/permiss/permiss":
          this.firstLab = "权限管理";
          this.secondLab = "角色列表";
          break;
        case "/welcome/permiss/role":
          this.firstLab = "权限管理";
          this.secondLab = "权限列表";
          break;
        case "/welcome/goods/goods":
          this.firstLab = "商品管理";
          this.secondLab = "商品列表";
          break;
        case "/welcome/goods/type":
          this.firstLab = "商品管理";
          this.secondLab = "分类列表";
          break;
        case "/welcome/goods/typeinfo":
          this.firstLab = "商品管理";
          this.secondLab = "商品分类";
          break;
        case "/welcome/order/order":
          this.firstLab = "订单管理";
          this.secondLab = "订单列表";
          break;
        case "/welcome/datas/datas":
          this.firstLab = "数据统计";
          this.secondLab = "数据报表";
          break;
        default:
          this.firstLab = "用户管理";
          this.secondLab = "用户列表";
      }
      this.$router.push(val);
    },
    isAside() {
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {
        this.asideWidth = "65px";
      } else {
        this.asideWidth = "201px";
      }
    },
    exit() {
      delCookie("token");
      this.$router.push("/login");
    },
    handleOpen(key, keyPath) {
      (key, keyPath);
    },
    handleClose(key, keyPath) {
      (key, keyPath);
    },
  },
};
</script>
<style lang="scss" scoped>
.app {
  height: 100%;
}
.header {
  display: flex;
  justify-content: space-between;
  .left {
    display: flex;
    span {
      margin-left: 15px;
      font-size: 22px;
    }
  }
}
.userbtn {
  background-color: #909399;
  color: #fff;
  border: 0;
}
.rightMove {
  margin-left: 10px;
}
.el-header,
.el-footer {
  background-color: #373d41;
  color: #fff;
  text-align: center;
  line-height: 60px;
}
.el-icon-s-fold::before {
  width: 20px;
  height: 20px;
}
.el-aside {
  background-color: #333744;
  color: #fff;
  text-align: center;
  line-height: 200px;
  transition: all 1s;
  .meau_flag {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #4a5064;
  }
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 0px;
  display: flex;
  flex-direction: column;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>