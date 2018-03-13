import Vue from 'vue'
import App from './sort/sort.vue'
import VueRouter from 'vue-router'
import router from './sort/router/router.js'


Vue.use(VueRouter)

new Vue({
  el: '#app',
  render: h => h(App),
  router:router
})
