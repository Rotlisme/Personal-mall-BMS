<template>
  <div class="header">
    <el-row :gutter="20">
      <el-col :span="1">
        <el-button class="el-icon-menu" size="mini" @click="toggle()">
        </el-button>
      </el-col>
      <el-col :span="6" :offset="17">
        <!-- 下拉菜单: command属性用来监听菜单点击事件, 事件回调里会收到被点击菜单的标识符 -->
        <el-dropdown @command="handleCommand">
          <!-- 菜单标题 -->
          <span class="el-dropdown-link">
            <span>你好, {{ username }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>

          <!-- 菜单列表 -->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>修改密码</el-dropdown-item>
            <!-- 记得设置command指令值, 不然无法区分点击的是那个菜单 -->
            <el-dropdown-item command="logout">注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  data() {
    return {
      username: localStorage.getItem("user")
    };
  },
  methods: {
    //切换侧边栏
    toggle() {
      this.$store.dispatch("increment");
    },
    // 注销
    logout() {
      // 注销成功后
      // 1 清除localStorage存储的用户信息
      // 2 跳转到登陆页
      this.$http.get(this.$api.logout).then(rsp => {
        localStorage.removeItem("user");
        this.$router.push("/login");
      });
    },

    // 下拉菜单控制器
    handleCommand(command) {
      switch (command) {
        case "logout":
          this.$confirm("您确定要退出登录", "退出提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.logout();
            })
            .catch(() => {});
          break;
      }
    }
  }
};
</script>

<style scoped lang="less">
.header {
  text-align: right;
  .el-icon-menu {
    font-size: 20px;
  }
}
</style>