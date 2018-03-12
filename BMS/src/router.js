import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter);

import home from './components/home.vue'
import users from './components/users/users.vue'
import header from './components/header/header.vue'
import products from './components/products/products.vue'
import login from './components/login/login.vue'

var router = new VueRouter({
    routes:[
        // {path:'/',component: home},
        {path:'/users',component: users},
        {path:'/header',component: header},
        {path:'/products',component: products},
        {path:'/login',component: login}
    ]
})
export default router;