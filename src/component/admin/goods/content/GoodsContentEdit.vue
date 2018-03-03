<template>
    <div class="goodsInfo">
        <!-- 面包屑导航 -->
        <section class="main_breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/admin/goods/content/list' }">返回上一层</el-breadcrumb-item>
                <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                <el-breadcrumb-item>商品内容</el-breadcrumb-item>
                <el-breadcrumb-item>编辑商品</el-breadcrumb-item>
            </el-breadcrumb>
        </section>

        <!-- 大表单 -->
        <el-form ref="form" label-position="left" :model="form" label-width="80px" class="detail_form" :rules="GoodsEditRules">
            <el-row :gutter="20">
                <el-col :span="10">
                    <el-form-item label="内容标题" prop="title">
                        <el-input v-model="form.title"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :offset="1">
                    <el-form-item label="副标题" prop="sub_title">
                        <el-input v-model="form.sub_title"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="所属类别" prop="category_id">
                        <el-select v-model="form.category_id" placeholder="请选择">
                            <el-option v-for="item in category" :key="item.category_id" :label="item.title" :value="item.category_id">
                                <!-- option里面可以加标签覆盖label文本, 但是label属性还得必须要, 不然会报错 -->
                                <span>
                                    <!-- 子级分类才有这个图标 -->
                                    <span v-if="item.class_layer != 1">|-</span>
                                    <span>{{ item.title }}</span>
                                </span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="是否发布">
                        <el-switch v-model="form.status"></el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="推荐类型">
                        <el-switch v-model="form.is_slide" active-text="轮播图"></el-switch>
                        <el-switch v-model="form.is_top" active-text="置顶"></el-switch>
                        <el-switch v-model="form.is_hot" active-text="推荐"></el-switch>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="上传封面">
                        <el-upload class="upload-demo" action="http://localhost:8899/admin/article/uploadimg" :file-list="form.imgList" list-type="picture" :on-success="uploadImg">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="上传附件">
                        <el-upload class="upload-demo" action="http://localhost:8899/admin/article/uploadimg" :file-list="form.fileList" :on-success="uploadFile">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="商品货号" prop="goods_no">
                        <el-input v-model="form.goods_no"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="库存数量" prop="stock_quantity">
                        <el-input v-model="form.stock_quantity"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="市场价格" prop="market_price">
                        <el-input v-model="form.market_price"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="销售价格" prop="sell_price">
                        <el-input v-model="form.sell_price"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-form-item label="内容摘要" prop="zhaiyao">
                <el-input type="textarea" v-model="form.zhaiyao"></el-input>
            </el-form-item>

            <el-form-item label="详细内容" prop="content">
                <quill-editor v-model="form.content"></quill-editor>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交保存</el-button>
                <!-- go方法用来前进后退历史记录 -->
                <el-button @click="$router.go(-1)" type="warning" plain>返回上一页</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
  data() {
    return {
      // 表单数据
      form: {
        title: "",
        sub_title: "",
        goods_no: "",
        category_id: "",
        market_price: "",
        sell_price: "",
        stock_quantity: "",
        zhaiyao: "",
        content: ""
      },
      // 分类列表数据
      category: [],
      // 页面一上来要从url里面拿到被编辑的商品ID
      id: this.$route.params.id,

      // 表单校验规则
      GoodsEditRules: {
        title: [{ required: true, message: "请输入内容标题", trigger: "blur" }],
        sub_title: [
          { required: true, message: "请输入副标题", trigger: "blur" }
        ],
        category_id: [
          { required: true, message: "请选择所属类别", trigger: "change" }
        ],
        goods_no: [
          { required: true, message: "请输入商品货号", trigger: "blur" }
        ],
        market_price: [
          { required: true, message: "请输入市场价格", trigger: "blur" }
        ],
        sell_price: [
          { required: true, message: "请输入销售价格", trigger: "blur" }
        ],
        stock_quantity: [
          { required: true, message: "请输入库存数量", trigger: "blur" }
        ],
        zhaiyao: [
          { required: true, message: "请输入内容摘要", trigger: "blur" }
        ],
        content: [
          { required: true, message: "请输入详细内容", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    // 获取商品数据
    getGoods() {
      this.$http.get(this.$api.gsDetail + this.id).then(res => {
        if (res.data.status == 0) {
          this.form = res.data.message;
          this.form.category_id = +this.form.category_id;
        }
      });
    },
    //获取商品分类数据
    getCategory() {
      this.$http.get(this.$api.ctList + "goods").then(res => {
        if (res.data.status == 0) {
          this.category = res.data.message;
        }
      });
    },

    //上传图片
    uploadImg(data) {
      this.form.imgList = [data];
    },

    //上传附件
    uploadFile(data) {
      this.form.fileList.push(data);
    },
    // 保存按钮
    onSubmit() {
      this.$http.post(this.$api.gsEdit + this.id, this.form).then(res => {
        if (res.data.status == 0) {
          this.$alert("数据修改成功");
        }
      });
    }
  },

  // 组件初始化完毕后就调用接口渲染表单默认数据
  created() {
    this.getGoods();
    this.getCategory();
  },

  components: {
    quillEditor
  }
};
</script>

<style scoped lang="less">
.detail {
  &_form {
    margin-top: 30px;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 20px;
    // box-sizing: content-box;
  }
}
</style>