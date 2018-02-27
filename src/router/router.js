// 导入受路由控制的组件
import HomeComponent from '../component/home/Home.vue';
import LoginComponent from '../component/login/Login.vue';
import RegisterComponent from '../component/register/Register.vue';

// 导出路由配置
export default {
    routes: [
        // 首页
        { path: "/", redirect: "/home" },
        { name: "h", path: "/home", component: HomeComponent },

        // 登陆
        { name: "l", path: "/login", component: LoginComponent },
        // 注册
        { name: "r", path: "/register", component: RegisterComponent },
    ]
};