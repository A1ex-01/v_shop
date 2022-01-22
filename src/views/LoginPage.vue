<template>
  <div class="login">
    <el-form :model="user" class="form">
      <el-form-item
        prop="acid"
        :rules="[
          {
            required: true,
            message: '请输入正确的用户名账号！',
            trigger: 'change',
            pattern: /^[a-zA-Z0-9_-]{4,16}$/,
          },
        ]"
      >
        <el-input
          maxlength="16"
          prefix-icon="el-icon-user-solid"
          minlength="8"
          type="num"
          v-model="user.acid"
          class="input_1"
        ></el-input>
      </el-form-item>
      <el-form-item
        prop="psw"
        :rules="[
          {
            required: true,
            message: '请输入正确的密码！',
            trigger: 'change',
            pattern: /^[a-zA-Z0-9_-]{4,16}$/,
          },
        ]"
      >
        <el-input
          show-password
          prefix-icon="el-icon-lock"
          maxlength="16"
          minlength="8"
          v-model="user.psw"
          class="input_1"
        ></el-input>
      </el-form-item>
      <el-form-item class="bottom">
        <el-button type="primary" @click="submit()">登录</el-button>
        <el-button type="info" @click="reset">重置</el-button>
      </el-form-item>
      <div class="img">
        <img
          src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-ba46750a-9919-4a60-8473-439618d2c95d/83c12dbd-280b-41f7-b4fb-1cbddd4f13a8.png"
        />
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        acid: "admin",
        psw: "123456",
      },
    };
  },
  computed: {},
  mounted() {},

  methods: {
    async submit() {
      if(this.user.acid.length > 4 && this.user.psw.length > 4){
        await this.$store.dispatch("user/login",{
          username:this.user.acid,
          password:this.user.psw
        });
      }
    },
    reset() {
      (this.user.acid = ""), (this.user.psw = "");
    },
  },
};
</script>
<style lang="scss" scoped>
.login {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #2b4b6b;
  display: flex;
  justify-content: center;
  align-items: center;
  .form {
    width: 450px;
    height: 300px;
    background-color: white;
    position: relative;
    padding: 0 20px;
    padding-top: 110px;
    box-sizing: border-box;
    border-radius: 3px;
    box-shadow: 0 0 3px #ddd;
    .bottom {
      display: flex;
      justify-content: flex-end;
    }
    .input_1 {
    }
    .img {
      position: absolute;
      top: -65px;
      left: 0;
      right: 0;
      margin: 0 auto;
      border-radius: 50%;
      height: 130px;
      width: 130px;
      background-color: white;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      > img {
        width: 130px;
        border-radius: 50%;
      }
    }
  }
}
</style>