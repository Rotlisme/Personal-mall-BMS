<template>
  <div class="login">
    <!-- 居中的容器 -->
    <div class="login_content">

      <!-- Logo -->
      <div class="login_content_logo">
        <img src="../../assets/images/logo.svg" alt="logo">
      </div>

      <!-- Form表单: 如果需要表单效验与重置功能, 需要设置model属性为整个表单数据 -->
      <el-form class="login_content_form" :model="user" :rules="loginFormRules" status-icon ref="ruleLoginForm" label-width="70px" label-position="left">

        <!-- 用户名: 表单效验与重置, 需要设置prop属性为表单字段 -->
        <el-form-item label="用户名" prop="uname">
          <!-- 用户名输入框: 这里的v-model记得关联表单字段 -->
          <el-input type="text" v-model="user.uname" auto-complete="off"></el-input>
        </el-form-item>

        <!-- 密码: 表单效验与重置, 需要设置prop属性为表单字段 -->
        <el-form-item label="密码" prop="upwd">
          <!-- 密码输入框: 这里的v-model记得关联表单字段 -->
          <el-input type="password" v-model="user.upwd" auto-complete="off"></el-input>
        </el-form-item>

        <!-- 按钮 -->
        <el-form-item>
          <el-button @click="submitForm('ruleLoginForm')">提交</el-button>
          <el-button @click="resetForm('ruleLoginForm')">重置</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 该数据将来提交给后端接口, 所以字段名必须与接口文档描述一致
      user: {
        uname: "admin",
        upwd: "123456"
      },
      // 表单校验规则
      loginFormRules: {
        uname: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            pattern: /\w{4,18}/,
            message: "长度在 4 到 18 个字符, 且只能为字母或数字",
            trigger: "blur"
          }
        ],
        upwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /.{6,18}/,
            message: "长度在 6 到 18 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },

  methods: {
    // 登陆
    login() {
      // 登陆成功后
      // 1 判断status是否为0, 不为0给出错误提示
      // 2 如果为0, 说明登陆成功, 本地localStorage存储后端返回的用户信息
      // 3 跳转到后台管理首页
      this.$http.post(this.$api.login, this.user).then(rsp => {
        console.log(rsp.data);
        let { status, message } = rsp.data; // 解构赋值的方式提取两个属性
        if (status == 0) {
          this.$notify({
            title: "成功",
            message: "这是一条成功的提示消息",
            type: "success",
            duration: 800
          });
          localStorage.setItem("user", message.uname); // 需要转换为字符串存储
          // this.$router.push({ path: this.$route.query.next }); //这里也可以使用路由规则名称{name:'/admin'}
          let nextPage = this.$route.query.next || "/admin";
          this.$router.push({ path: nextPage });
        } else {
          this.$alert(message);
        }
      });
    },

    // 点击提交按钮, 先做表单校验, 校验通过后才可登陆
    submitForm(formName) {
      this.$refs[formName].validate(result => {
        if (result) {
          this.login();
        } else {
          alert("哥们你逗我呢!");
        }
      });
    },

    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped lang="less">
.login {
  height: 100%;
  background-color: rgb(38, 124, 183);

  // 使盒子处于页面中间偏上的位置
  &_content {
    width: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -200px;
    margin-top: -170px;

    // logo居中
    &_logo {
      text-align: center;
      padding-bottom: 10px;
    }

    // form表单添加背景与圆角边框
    &_form {
      padding: 30px 10px 10px;
      background-color: #fff;
      border: 1px solid hsla(0, 0%, 100%, 0.2);
      border-radius: 10px;
    }
  }
}
</style>