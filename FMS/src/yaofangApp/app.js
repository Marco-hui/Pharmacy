// import './common/bootstrap.css'
import './common/common.css'
import Vue from 'vue'
import router from './router/rounter.js'

import appComponent from './components/app/app.vue'
import store from './vuex/store.js'

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(appComponent)
})