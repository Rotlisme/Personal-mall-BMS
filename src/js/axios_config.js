// 导入axios与接口域名
import axios from 'axios';
import { domain } from './api_config.js';

// 配置默认域名, 这样请求的时候就不用在url里加域名了
axios.defaults.baseURL = domain;

// 我们是跨域请求的接口, 默认不会携带cookie等信息, 后端需要这些信息来判断登陆状态, 所以要设为true
axios.defaults.withCredentials = true;

// 导出配置后的axios
export default axios;