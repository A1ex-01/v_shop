<template>
  <div class="app">
    <el-container style="height: 100%">
      <el-header class="header">
        <div class="left">
          <img src="../assets/logo.png" />
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
            :default-active="defaultIndex"
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
                @click="goRouter('/welcome/userlist/userlist', '1-1')"
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
                @click="goRouter('/welcome/permiss/permiss', '2-1')"
                >角色列表</el-menu-item
              >
              <el-menu-item
                index="2-2"
                @click="goRouter('/welcome/permiss/role', '2-2')"
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
                @click="goRouter('/welcome/goods/goods', '3-1')"
                >商品列表</el-menu-item
              >
              <el-menu-item
                index="3-2"
                @click="goRouter('/welcome/goods/type', '3-2')"
                >分类列表</el-menu-item
              >
              <el-menu-item
                index="3-3"
                @click="goRouter('/welcome/goods/typeinfo', '3-3')"
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
                @click="goRouter('/welcome/order/order', '4-1')"
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
                @click="goRouter('/welcome/datas/datas', '5-1')"
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
      defaultIndex: "1-1",
    };
  },
  computed: {
    username() {
      const user = getCookie("username");
      return user;
    },
  },
  mounted() {
    this.getIndex();
  },
  methods: {
    getIndex() {
      this.defaultIndex = sessionStorage.getItem("index") || '1-1';
      this.firstLab = sessionStorage.getItem("firstLab") || '用户管理';
      this.secondLab = sessionStorage.getItem("secondLab") || '用户列表';
    },
    goRouter(val, index) {
      switch (val) {
        case "/welcome/userlist/userlist":
          sessionStorage.setItem("firstLab", "用户管理");
          sessionStorage.setItem("secondLab", "用户列表");
          sessionStorage.setItem("index", index);
          break;
        case "/welcome/permiss/permiss":
          sessionStorage.setItem("firstLab", "权限管理");
          sessionStorage.setItem("secondLab", "角色列表");
          sessionStorage.setItem("index", index);
          this.getIndex();

          break;
        case "/welcome/permiss/role":
          sessionStorage.setItem("firstLab", "权限管理");
          sessionStorage.setItem("secondLab", "权限列表");
          sessionStorage.setItem("index", index);
          this.getIndex();

          break;
        case "/welcome/goods/goods":
          sessionStorage.setItem("firstLab", "商品管理");
          sessionStorage.setItem("secondLab", "商品列表");
          sessionStorage.setItem("index", index);
          this.getIndex();

          break;
        case "/welcome/goods/type":
          sessionStorage.setItem("firstLab", "商品管理");
          sessionStorage.setItem("secondLab", "分类列表");
          sessionStorage.setItem("index", index);
          this.getIndex();

          break;
        case "/welcome/goods/typeinfo":
          sessionStorage.setItem("firstLab", "商品管理");
          sessionStorage.setItem("secondLab", "商品分类");
          sessionStorage.setItem("index", index);
          this.getIndex();

          break;
        case "/welcome/order/order":
          sessionStorage.setItem("firstLab", "订单管理");
          sessionStorage.setItem("secondLab", "订单列表");
          sessionStorage.setItem("index", index);
          this.getIndex();

          break;
        case "/welcome/datas/datas":
          sessionStorage.setItem("firstLab", "数据统计");
          sessionStorage.setItem("secondLab", "数据报表");
          sessionStorage.setItem("index", index);
          this.getIndex();

          break;
        default:
          sessionStorage.setItem("firstLab", "用户管理");
          sessionStorage.setItem("secondLab", "用户列表");
          sessionStorage.setItem("index", index);
          this.getIndex();
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
      key, keyPath;
    },
    handleClose(key, keyPath) {
      key, keyPath;
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