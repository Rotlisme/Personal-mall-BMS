<template>
  <div class="goods-list">
    <!-- 面包屑导航 -->
    <section class="main_breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品内容</el-breadcrumb-item>
        <el-breadcrumb-item>内容列表</el-breadcrumb-item>
      </el-breadcrumb>
    </section>

    <!-- 按钮组 -->
    <section class="main_btns">
      <el-row :gutter="20">
        <el-col :span='20'>
          <el-button size="small" plain icon="el-icon-check">全选</el-button>
          <el-button size="small" plain icon="el-icon-plus" @click="$router.push({name: 'gcta'})">新增</el-button>
          <el-button size="small" plain icon="el-icon-delete">删除</el-button>
        </el-col>
        <el-col :span='4'>
          <el-input v-model="query.searchvalue" @blur="getGoodsList" size="small" prefix-icon="el-icon-search" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 商品列表接口所需的查询字符串
      query: {
        pageIndex: 1,
        pageSize: 10,
        searchvalue: ""
      },
      // 商品列表数据
      goodsList: [],
      // 数据总量
      totalcount: 0
    };
  },

  methods: {
    // 获取商品列表数据
    getGoodsList() {
      this.$http.get(this.$api.gsList, { params: this.query }).then(rsp => {
        this.goodsList = rsp.data.message;
        this.totalcount = rsp.data.totalcount;
      });
    },

    // 修改当前页
    handleCurrentChange(pageIndex) {
      this.query.pageIndex = pageIndex;
      this.getGoodsList();
    },

    // 修改每页数量
    handleSizeChange(pageSize) {
      this.query.pageSize = pageSize;
      this.getGoodsList();
    }
  },

  created() {
    this.getGoodsList();
  }
};
</script>

<style scoped lang="less">
.main_breadcrumb {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.main_btns {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
</style>