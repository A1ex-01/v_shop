<template>
  <div class="user">
    <div class="search">
      <el-input placeholder="请输入内容" style="width: 300px" v-model="search">
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="searchUser"
        ></el-button>
      </el-input>
      <el-button type="primary" style="margin-left: 10px" @click="addUser"
        >添加用户</el-button
      >
    </div>
    <div class="tab">
      <el-table :data="userInfoList" style="width: 100%" border>
        <el-table-column fixed prop="id" label="序号" width="110">
        </el-table-column>
        <el-table-column prop="username" label="姓名" width="150">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="220">
        </el-table-column>
        <el-table-column prop="mobile" label="电话" width="150">
        </el-table-column>
        <el-table-column prop="role_name" label="角色" width="150">
        </el-table-column>
        <el-table-column prop="mg_state" label="状态" width="150">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="stateChange(scope.row.mg_state, scope.row.id)"
              active-color="#409EFF"
              inactive-color="#DCDFE6"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="260">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="resetInfo(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="deleteUser(scope.row.id)"
            ></el-button>
            <el-button
              type="warning"
              icon="el-icon-s-tools"
              @click="resetRole"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="bottom">
        <el-pagination
          background
          layout="prev, pager, next, total, jumper"
          v-if="userInfoList"
          :total="total"
          :page-size="5"
          :current-page="pagenum"
          @current-change="currChange"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog title="修改用户" :visible.sync="resetInfoBtn">
      <el-form v-for="(item, index) in userInfoList" :key="'user_' + index">
        <el-form-item label="用户名" label-width="70px" v-if="item.id == id">
          <el-input
            autocomplete="off"
            v-model="item.username"
            disabled
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form
        :model="userInfoList"
        v-for="(item, index) in userInfoList"
        :key="'email_' + index"
      >
        <el-form-item label="邮箱" label-width="70px" v-if="item.id == id">
          <el-input autocomplete="off" v-model="item.email"></el-input>
        </el-form-item>
      </el-form>
      <el-form v-for="(item, index) in userInfoList" :key="'mobile_' + index">
        <el-form-item
          label="手机号"
          required
          label-width="70px"
          v-if="item.id == id"
        >
          <el-input autocomplete="off" v-model="item.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="quit">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加用户" :visible.sync="addUserBtn">
      <el-form>
        <el-form-item label="用户名" required label-width="70px">
          <el-input
            autocomplete="off"
            v-model="addUserInfo.username"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item label="密码" required label-width="70px">
          <el-input autocomplete="off" v-model="addUserInfo.pasw"></el-input>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item label="邮箱" required label-width="70px">
          <el-input autocomplete="off" v-model="addUserInfo.email"></el-input>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item label="手机号" required label-width="70px">
          <el-input autocomplete="off" v-model="addUserInfo.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addQuit">取 消</el-button>
        <el-button type="primary" @click="addConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      resetInfoBtn: false,
      addUserBtn: false,
      id: "",
      search: "",
      addUserInfo: {
        username: "",
        pasw: "",
        email: "",
        mobile: "",
      },
    };
  },
  computed: {
    ...mapState({
      userInfoList: (state) => state.userManager.userInfoList,
      total: (state) => state.userManager.total,
      pagenum: (state) => state.userManager.pagenum,
    }),
  },
  mounted() {
    this.getInitData();
  },
  methods: {
    getInitData() {
      this.$store.dispatch("userManager/getUserInfoList");
    },
    stateChange(val, id) {
      this.$store.dispatch("userManager/changeState", { state: val, id: id });
    },
    resetInfo(val) {
      this.id = val;
      this.resetInfoBtn = true;
    },
    deleteUser(val) {
      ("deleteUser");
      this.$store.dispatch("userManager/deleteUser", { id: val });
    },
    resetRole() {
      ("resetRole");
    },
    quit() {
      this.resetInfoBtn = false;
      (1);
    },
    confirm() {
      this.resetInfoBtn = false;
      for (let i = 0; i < this.userInfoList.length; i++) {
        if (this.userInfoList[i].id == this.id) {
          this.$store.dispatch("userManager/changeInfo", {
            id: this.id,
            email: this.userInfoList[i].email,
            mobile: this.userInfoList[i].mobile,
          });
        }
      }
    },
    currChange(val) {
      (val);
      this.$store.commit("userManager/changePagenum", { result: val });
      this.$store.dispatch("userManager/updateInfoList");
    },
    addUser() {
      this.addUserBtn = true;
    },
    addQuit() {
      this.addUserBtn = false;
    },
    addConfirm() {
      this.addUserBtn = false;
      (this.addUserInfo);
      this.$store.dispatch("userManager/addUser", {
        username: this.addUserInfo.username,
        password: this.addUserInfo.pasw,
        email: this.addUserInfo.email,
        mobile: this.addUserInfo.mobile,
      });
    },
    searchUser() {
      if (this.search) {
        this.$store.dispatch("userManager/getFillterList", {
          result: this.search,
        });
      } else {
        this.$store.dispatch("userManager/updateInfoList");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.user {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.search {
  display: flex;
  background-color: white;
  padding: 25px 0px;
  padding-left: 30px;
  box-sizing: border-box;
}
.tab {
  background-color: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 30px;
  box-sizing: border-box;
}
.el-table {
  width: 1191.5px !important;
}
.bottom {
  margin: 30px 0px;
}
</style>