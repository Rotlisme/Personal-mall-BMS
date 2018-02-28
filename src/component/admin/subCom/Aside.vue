<template>
    <div class="aside">

        <!-- logo -->
        <div class="aside_logo">
            <img src="../../../assets/images/logo.svg" alt="logo">
        </div>

        <!-- nav: default-active属性用来设置默认打开的菜单 -->
        <el-menu default-active="2" class="aside_menu" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">

            <!-- subnav: key属性需要一个唯一值用于for循环渲染时性能优化, index属性同样需要一个唯一值用于展开导航列表 -->
            <el-submenu v-for="item in menu" :key="item.title" :index="item.title">

                <!-- nav_title -->
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>{{ item.title }}</span>
                </template>

                <!-- nav_item -->
                <el-menu-item v-for="subItem in item.submenu" :key="subItem.text" :index="subItem.text">
                    <!-- 每个子title都是一个a链接, 可以点击, 所以使用router-link, 记得设置to属性 -->
                    <router-link :to="subItem.path">
                        <i class="el-icon-document"></i>
                        <span>{{ subItem.text }}</span>
                    </router-link>
                </el-menu-item>

            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          title: "学员问题",
          submenu: [
            { text: "内容管理", path: "/admin/student/content/list" },
            { text: "类别管理", path: "/admin/student/category/list" },
            { text: "评论管理", path: "/admin/student/comment/list" }
          ]
        },
        {
          title: "前端技术",
          submenu: [
            { text: "内容管理", path: "/admin/web/content/list" },
            { text: "类别管理", path: "/admin/web/category/list" },
            { text: "评论管理", path: "/admin/web/comment/list" }
          ]
        },
        {
          title: "难点答疑",
          submenu: [
            { text: "内容管理", path: "/admin/difficulty/content/list" },
            { text: "类别管理", path: "/admin/difficulty/category/list" },
            { text: "评论管理", path: "/admin/difficulty/comment/list" }
          ]
        },
        {
          title: "资源下载",
          submenu: [
            { text: "内容管理", path: "/admin/assets/content/list" },
            { text: "类别管理", path: "/admin/assets/category/list" },
            { text: "评论管理", path: "/admin/assets/comment/list" }
          ]
        },
        {
          title: "商品管理",
          submenu: [
            { text: "内容管理", path: "/admin/goods/content/list" },
            { text: "类别管理", path: "/admin/goods/category/list" },
            { text: "评论管理", path: "/admin/goods/comment/list" }
          ]
        },
        {
          title: "订单管理",
          submenu: [{ text: "订单列表", path: "/admin/order/content/list" }]
        }
      ]
    };
  }
};
</script>

<style scoped lang="less">
// 让导航列表撑满屏幕
.aside {
  height: 100%;
  text-align: left;
  background-color: rgb(84, 92, 100);

  // logo居中显示
  &_logo {
    text-align: center;
  }

  // 去掉导航展开时右边的1像素边框
  .el-menu {
    border-right: 0;

    // 去掉导航列表的最小宽度限制
    &-item {
      min-width: 0;
    }
  }
}
</style>