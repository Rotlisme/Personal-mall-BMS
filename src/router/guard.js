import axios from 'axios';
import api from '../js/api_config.js';


// 导出一个全局的路由守卫对象
export default function (to, from, next) {

    // 实现步骤:
    // 1. 请求接口判断当前是否处于登陆状态(也可以通过cookie判断)
    // 2. 通过to对象的name属性得知用户去往的页面
    // 2.1 如果去往登陆页面
    // 2.2 已登陆 -> 自动跳转到首页 -> 调next('/')
    // 2.3 未登陆 -> 允许访问 -> 调next()
    // 3.1 如果去往非登陆页面
    // 3.2 已登陆 -> 允许访问 -> 调next()
    // 3.3 未登陆 -> 自动跳转到登陆页 -> 调next('/login')
    axios.get(api.islogin).then(res => {
        let logined = res.data.code == 'logined';
        //去往登录页面
        if (to.name === 'login') {
            if (logined) {
                next('/');
            }
            else {
                next();
            }
        }
        //去往非登录页面
        else if (to.name !== 'login') {
            if (logined) {
                next();
            }
            else {
                next('/login');
            }
        }
    })
}