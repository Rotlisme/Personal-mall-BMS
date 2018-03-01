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
    <!-- Table表格: data属性为要渲染的列表数据 -->
    <section class="main_tbl">
      <el-table :data="goodsList" ref="multipleTable" tooltip-effect="dark" height="400" style="width: 100%; line-height: 18px; text-align: center;" border>
        <!-- 多选框 -->
        <el-table-column type="selection" width="55">
        </el-table-column>
        <!-- 商品数据列表: prop属性为列表数据里的字段名称 -->
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="类别" prop="categoryname" width="100"></el-table-column>
        <el-table-column label="库存" prop="stock_quantity" width="100"></el-table-column>
        <el-table-column label="市场价" prop="market_price" width="100"></el-table-column>
        <el-table-column label="销售价" prop="sell_price" width="100"></el-table-column>

        <!-- 商品状态: 里面的template标签可以放置任意html结构 -->
        <el-table-column label="状态" width="100">
          <template slot-scope="scope">
            <!-- v-bind:class可以通过数组批量设置class -->
            <i :class="['el-icon-picture', scope.row.is_slide? 'active': '']"></i>
            <i :class="['el-icon-upload2', scope.row.is_top? 'active': '']"></i>
            <i :class="['el-icon-star-on', scope.row.is_hot? 'active': '']"></i>
          </template>
        </el-table-column>
        <!-- 编辑商品 -->
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <router-link :to="{name:'gcte', params: {id: scope.row.id}}">编辑</router-link>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <section class="pagination">
      <!-- 分页: current-page展示当前页, totle用来设置数据总量然后动态计算分页  -->
      <!-- 分页: current-change监听页变化, size-change监听每页数据变量  -->
      <el-pagination :current-page="query.pageIndex" :page-sizes="[10, 20, 30, 40]" :page-size="10" @current-change="handleCurrentChange" @size-change="handleSizeChange" :total="totalcount" layout="total, sizes, prev, pager, next, jumper" background>
      </el-pagination>
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
  margin: 10px 0 5px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
}

.main_tbl {
  text-align: center;
}
</style>