<template>
  <div class="goods-list">
    <!-- 面包屑导航 -->
    <section class="main_breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>类别管理</el-breadcrumb-item>
        <el-breadcrumb-item>类别列表</el-breadcrumb-item>
      </el-breadcrumb>
    </section>

    <!-- 按钮组 -->
    <section class="main_btns">
      <el-row :gutter="20">
        <el-col :span='20'>
          <div class="btns">
            <el-button size="small" plain icon="el-icon-check" @click="selectAll">全选</el-button>
            <el-button size="small" plain icon="el-icon-plus" @click="$router.push({name: 'gcta'})">新增</el-button>
            <el-button size="small" plain icon="el-icon-delete">删除</el-button>
          </div>
        </el-col>
        <el-col :span='4'>
          <el-input prefix-icon="el-icon-search" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
    </section>

    <!-- Table表格: data属性为要渲染的列表数据 -->
    <section class="main_tbl">
      <el-table ref="multipleTable" :data="categoryList" tooltip-effect="dark" style="width: 100%; text-align:center; line-height: 18px;" border height="422" @selection-change="change">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="编号" width="120" prop="category_id">
        </el-table-column>
        <el-table-column prop="title" label="类别名称">
        </el-table-column>
        <el-table-column label="排序号" width="120">
          <template slot-scope="scope">
            <el-input size="mini" prefix-icon="el-icon-sort-down" :value="scope.row.sort_id"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="class_layer" label="	层级" width="120">
        </el-table-column>
        <el-table-column prop="address" label="	操作" width="150">
          <template slot-scope="scope">
            <el-button type="info" icon="el-icon-circle-plus-outline" size="mini"></el-button>
            <el-button type="info" icon="el-icon-edit-outline" size="mini"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categoryList: [],
      selectedcategoryList: []
    };
  },
  methods: {
    //获取分类数据
    getGoodsCategory() {
      this.$http.get(this.$api.ctList + "goods").then(res => {
        this.categoryList = res.data.message;
      });
    },

    //当商品被勾选发生改变的事件
    change(selection) {
      this.selectedcategoryList = selection;
    },

    //全选按钮事件
    selectAll() {
      document.querySelector(".el-checkbox__original").click();
    }
  },
  created() {
    this.getGoodsCategory();
  }
};
</script>

<style scoped lang="less">
.main_breadcrumb {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.main_btns {
  margin: 10px 0 15px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 10px;
  .btns {
    line-height: 40px;
  }
}
</style>