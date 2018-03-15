import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import homeComponent from '../components/home/home.vue'
import loginComponent from '../components/login/login.vue'
import registerComponnet from '../components/register/register.vue'
import cartsComponent from '../components/carts/carts.vue'
import mineComoponent from '../components/mine/mine.vue'
import orderComponent from '../components/order/order.vue'
const router = new VueRouter({
    routes: [
        {path: '/', component: homeComponent},
        {path: '/login', component: loginComponent},
        {path: '/register', component: registerComponnet},
        {path: '/carts', component: cartsComponent},
        {path: '/mine', component: mineComoponent},
        {path: '/order', component: orderComponent}
    ]
})
export default router;