
import Vue from 'vue'
import app from './components/app/app.vue'

import router from './router/router.js'
import store from './vuex/store.js'

import VueLazyComponent from '@xunlei/vue-lazy-component'

Vue.use(VueLazyComponent)

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(app)
})