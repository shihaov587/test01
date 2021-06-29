// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './plugins/element.js'
import "./assets/css/common.css"
import store from './store'

Vue.config.productionTip = false
// Vue.prototype.$axios=Axios;
/* eslint-disable no-new */
if(localStorage.getItem('egouser')&&localStorage.getItem('token')){
  store.commit('LoginModule/setToken',localStorage.getItem('token'))
  store.commit('LoginModule/setUser',localStorage.getItem('egouser'))
}
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
