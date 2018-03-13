import Vue from 'vue'
Vue.use(VueRouter)

import VueRouter from 'vue-router'
import block1 from '../dataReq/block1.vue'
import block2 from '../dataReq/block2.vue'
import block3 from '../dataReq/block3.vue'
import block4 from '../dataReq/block4.vue'
import block5 from '../dataReq/block5.vue'
import block6 from '../dataReq/block6.vue'
import block7 from '../dataReq/block7.vue'
import block8 from '../dataReq/block8.vue'
import list from '../list/list.vue'


const router = new VueRouter({
    routes:[
        {path:'/',component:block1},
        {path:'/block2',component:block2},
        {path:'/block3',component:block3},
        {path:'/block4',component:block4},
        {path:'/block5',component:block5},
        {path:'/block6',component:block6},
        {path:'/block7',component:block7},
        {path:'/block8',component:block8},
        {path:'/list',component:list}

    ],

    
})
export default router