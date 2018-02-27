// 1.1 导入第三方库
import Vue from 'Vue';
import VueRouter from 'vue-router';

// 1.2 启动Vue插件
Vue.use(VueRouter);

// 2.1 导入根组件
import AppComponent from './component/App.vue';

// 2.2 导入路由配置
import routerConfig from './router/router.js';

//2.3导入登录组件
import Login from './component/login/Login.vue';

// 3.1 导入配置后的axios与api, 并注入到Vue原型中 将来在实例通过this.$http调用
import axios from './js/axios_config.js';
import api from './js/api_config.js';
Vue.prototype.$http = axios;
Vue.prototype.$api = api;

// 渲染根组件, 启动项目
new Vue({
    el: '#app',
    render(createNode) {
        return createNode(Login);
    },
    router: new VueRouter(routerConfig)
});