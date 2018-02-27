// 1.1 导入第三方库
import Vue from 'Vue';
import VueRouter from 'vue-router';

// 1.2 启动Vue插件
Vue.use(VueRouter);

// 2.1 导入根组件
import AppComponent from './component/App.vue';

// 2.2 导入路由配置
import routerConfig from './router/router.js';

// 挂载根组件, 启动应用
new Vue({
    el: '#app',
    render: c => c(AppComponent),
    router: new VueRouter(routerConfig)
});