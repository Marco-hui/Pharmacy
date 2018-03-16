import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import header from '../components/header/header.js'
import home from '../components/home.js'

const store = new Vuex.Store({
    modules:{        header,
        home
    }
})

export default store;