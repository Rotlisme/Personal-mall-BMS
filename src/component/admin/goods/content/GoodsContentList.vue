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
          <div class="btns">
            <el-button size="small" plain icon="el-icon-check" @click="selectAll">全选</el-button>
            <el-button size="small" plain icon="el-icon-plus" @click="$router.push({name: 'gcta'})">新增</el-button>
            <el-button size="small" plain icon="el-icon-delete" @click="del">删除</el-button>
          </div>
        </el-col>
        <el-col :span='4'>
          <el-input v-model="query.searchvalue" @blur="getGoodsList" prefix-icon="el-icon-search" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
    </section>
    <!-- Table表格: data属性为要渲染的列表数据 -->
    <section class="main_tbl">
      <el-table :data="goodsList" ref="multipleTable" tooltip-effect="dark" height="373" style="width: 100%; line-height: 18px; text-align: center;" border @selection-change="change">
        <!-- 多选框 -->
        <el-table-column type="selection" width="55">
        </el-table-column>
        <!-- 商品数据列表: prop属性为列表数据里的字段名称 -->
        <el-table-column label="标题">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="" placement="right">
              <router-link style="color: #409eff; font-size:12px" :to="{ path: `/admin/goods/getgoodsmodel/${scope.row.id}` }">{{ scope.row.title }}</router-link>
              <div slot="content">
                <img :src="scope.row.imgurl" alt="图片提示" style="width:200px">
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
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
            <router-link :to="{name:'gcte', params: {id: scope.row.id}}">
              <el-button type="info" icon="el-icon-edit" size="mini"></el-button>
            </router-link>
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
      totalcount: 0,
      //被选中商品的数组
      selectedGoodsList: []
    };
  },

  methods: {
    // 获取商品列表数据
    getGoodsList() {
      this.$http.get(this.$api.gsList, { params: this.query }).then(res => {
        this.goodsList = res.data.message;
        this.totalcount = res.data.totalcount;
      });
    },
    //当商品被勾选发生改变的事件
    change(selection) {
      this.selectedGoodsList = selection;
    },

    //删除商品
    del() {
      let delIDs = this.selectedGoodsList.map(v => v.id);
      this.$confirm("您确定要删除该商品", "删除商品提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.get(this.$api.gsDel + delIDs).then(res => {
            if (res.data.status == 0) {
              this.$alert(res.data.message);
              this.getGoodsList();
            }
          });
        })
        .catch(() => {});
    },

    //全选按钮事件
    selectAll() {
      document.querySelector(".el-checkbox__original").click();
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
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 10px;
  .btns {
    line-height: 40px;
  }
}

.pagination {
  margin-top: 25px;
}

[class^="el-icon"].active {
  color: rgb(26, 24, 24);
  font-weight: 600;
}
</style>