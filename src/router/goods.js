// 商品管理模块组件
import GoodsContentListComponent from '../component/admin/goods/content/GoodsContentList.vue';
import GoodsContentAddComponent from '../component/admin/goods/content/GoodsContentAdd.vue';
import GoodsContentEditComponent from '../component/admin/goods/content/GoodsContentEdit.vue';
import GoodsCategoryListComponent from '../component/admin/goods/category/GoodsCategoryList.vue';
import GoodsCategoryAddComponent from '../component/admin/goods/category/GoodsCategoryAdd.vue';
import GoodsCategoryEditComponent from '../component/admin/goods/category/GoodsCategoryEdit.vue';
import GoodsCommentListComponent from '../component/admin/goods/comment/GoodsCommentList.vue';
import GoodsCommentEditComponent from '../component/admin/goods/comment/GoodsCommentEdit.vue';

module.exports = [
    // 商品管理
    { name: "gctl", path: "goods/content/list", component: GoodsContentListComponent },
    { name: "gcta", path: "goods/content/add", component: GoodsContentAddComponent },
    { name: "gcte", path: "goods/content/edit", component: GoodsContentEditComponent },

    // 商品分类管理
    { name: "gcgl", path: "goods/category/list", component: GoodsCategoryListComponent },
    { name: "gcga", path: "goods/category/add", component: GoodsCategoryAddComponent },
    { name: "gcge", path: "goods/category/edit", component: GoodsCategoryEditComponent },

    // 商品评论管理
    { name: "gcml", path: "goods/comment/list", component: GoodsCommentListComponent },
    { name: "gcme", path: "goods/comment/edit", component: GoodsCommentEditComponent },
];