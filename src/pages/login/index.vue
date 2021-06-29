<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>登录</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import api from "../../api";
import { mapMutations } from "vuex";
export default {
  name: "login",
  data() {
    return {
      form: {},
    };
  },
  methods: {
    ...mapMutations("LoginModule", ["setToken", "setUser"]),
    onSubmit() {
      if (this.form.username && this.form.password) {
        api
          .getLogin({
            username: this.form.username,
            password: this.form.password,
          })
          .then((res) => {
            console.log(res.data);
            if (res.data.status === 200) {
              console.log(11111);
              this.setToken(res.data.token);
              this.setUser(res.data.username);
              // 本地存储
              console.log(2222);
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("egouser", res.data.username);
              this.$router.replace("/product");
            } else {
              this.$message.error(res.data.msg);
            }
          });
      } else {
        this.$message("请输入信息");
      }
    },
  },
};
</script>
<style scoped>
.login {
  width: 600px;
  margin: 0 auto;
  margin-top: 100px;
}
</style>