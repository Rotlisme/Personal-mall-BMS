// 1.1 导入第三方库
import Vue from 'vue';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css';
import { store } from './vuex/store.js';
// 1.2 启动Vue插件
Vue.use(Vuex);
Vue.use(ElementUI);

// 1.3 导入全局样式
import './less/index.less';

// 2.1 导入根组件
import App from './component/App.vue';

// 2.2 导入路由配置与路由守卫
import router from './router/router.js';
import routerGuard from './router/guard.js';
//启动路由守卫
router.beforeEach(routerGuard);

// 3.1 导入配置后的axios与api, 并注入到Vue原型中 将来在实例通过this.$http调用
import axios from './js/axios_config.js';
import api from './js/api_config.js';
Vue.prototype.$http = axios;
Vue.prototype.$api = api;

// 渲染根组件, 启动项目
new Vue({
    el: '#app',
    router,
    store,
    render(createNode) {
        return createNode(App);
    }
});