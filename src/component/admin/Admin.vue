<template>
  <el-container>

    <!-- 左侧 -->
    <el-aside width="200px">
      <!-- 左侧导航, 公共部分 -->
      <app-aside></app-aside>
    </el-aside>

    <!-- 右侧 -->
    <el-container>
      <!-- 右侧头部, 公共部分 -->
      <el-header>
        <app-header></app-header>
      </el-header>

      <!-- 右侧主体, 变化部分, 将来要通过子路由控制 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>

  </el-container>
</template>

<script>
// 导入公共的左侧与头部组件, 需要注册才能使用
import Aside from "./subCom/Aside.vue";
import Header from "./subCom/Header.vue";

export default {
  // 注册子组件, key为组件名称(将=使用时的标签名称), value为未注册的组件
  components: {
    "app-aside": Aside,
    "app-header": Header
  }
};
</script>

<style scoped lang="less">
// 页面架构高度固定, 左侧与右侧高度独自控制
.el-container {
  height: 100%;

  // 左侧导航
  .el-aside {
    height: 100%;
    background-color: #d3dce6;
    color: #333;
  }

  // 右侧
  .el-container {
    height: 100%;

    // 右侧头部
    .el-header {
      background-color: #b3c0d1;
      color: #333;
      line-height: 60px;
    }

    // 右侧主体
    .el-main {
      background-color: #e9eef3;
      color: #333;
    }
  }
}
</style>
