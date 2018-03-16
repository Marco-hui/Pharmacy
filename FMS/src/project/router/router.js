import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// lhk

import HomeComponent from '../components/home/home.vue'
import detailsComponent from '../components/details/details.vue'
import search from '../components/search/search.vue'
import regionComponent from '../components/order/region3.vue'

// klq
import cartsComponent from '../components/carts/carts.vue'
import loginComponent from '../components/login/login.vue'
import registerComponnet from '../components/register/register.vue'
import mineComoponent from '../components/mine/mine.vue'
import orderComponent from '../components/order/order.vue'
import paymentComponent from '../components/payment/payment.vue'
import popComponent from '../components/pop/pop.vue'
import shezhiComponent from '../components/mine/touxiang.vue'

// ckh
import block1 from '../components/dataReq/block1.vue'
import block3 from '../components/dataReq/block3.vue'
import block2 from '../components/dataReq/block2.vue'
import block4 from '../components/dataReq/block4.vue'
import block5 from '../components/dataReq/block5.vue'
import block6 from '../components/dataReq/block6.vue'
import block7 from '../components/dataReq/block7.vue'
import block8 from '../components/dataReq/block8.vue'

import list from '../components/list/list.vue'
import list2 from '../components/list/list2.vue'
import list3 from '../components/list/list3.vue'
import list4 from '../components/list/list4.vue'
import list5 from '../components/list/list5.vue'
import list6 from '../components/list/list6.vue'
import list7 from '../components/list/list7.vue'
import list8 from '../components/list/list8.vue'

const router = new VueRouter({
    routes: [
        {path: '/', component: HomeComponent},
        {path: '/details/:id',component: detailsComponent},
        {path:'/search',component:search},

        {path: '/login', component: loginComponent},
        {path: '/register', component: registerComponnet},
        {path: '/carts', component: cartsComponent},
        {path: '/mine', component: mineComoponent},
        {path: '/order', component: orderComponent},
        {path: '/payment/:price', component: paymentComponent},
        {path: '/pop', component: popComponent},
        {path: '/shezhi', component: shezhiComponent},
        {path: '/region', component: regionComponent},



       
        {path:'/sort',component:block1},
        {path:'/list',component:list},
        {path:'/block2',component:block2},
        {path:'/block3',component:block3},
        {path:'/block4',component:block4},
        {path:'/block5',component:block5},
        {path:'/block6',component:block6},
        {path:'/block7',component:block7},
        {path:'/block8',component:block8},

        {path:'/list2',component:list2},
        {path:'/list3',component:list3},
        {path:'/list4',component:list4},
        {path:'/list5',component:list5},
        {path:'/list6',component:list6},
        {path:'/list7',component:list7},
        {path:'/list8',component:list8},


    ]
})

export default router;