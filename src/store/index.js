import Vue from 'vue'
// import 'es6-promise/auto'
import Vuex from 'vuex'
import LoginModule from './modules/loginModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    LoginModule
  }
})