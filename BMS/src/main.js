import Vue from 'vue';
import Router from 'vue-router';
import App from './components/home.vue';

Vue.use(Router);

// 引入路由
import router from "./router.js"
new Vue({
    el: '#app',
    router, // 注入到根实例中
    render: h => h(App)
});