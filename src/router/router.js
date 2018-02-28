// 导入受路由控制的组件
import Login from '../component/login/Login.vue';
import Admin from '../component/admin/Admin.vue';
import Shopcart from '../component/admin/shopcart/Shopcart.vue';

const shopcart = [
    { name: 'shopcart', path: 'shopcart', component: Shopcart }
]
// 导出路由配置
export default {
    routes: [
        // 登陆
        { name: "login", path: "/login", component: Login },
        // 后台管理
        {
            name: "admin", path: "/admin", component: Admin,
            children: [...shopcart]
        },
    ]
};