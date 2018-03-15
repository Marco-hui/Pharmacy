import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import updata from './updata.js'

const store = new Vuex.Store({
    updata
})

export default store;