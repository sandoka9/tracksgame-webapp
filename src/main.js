// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.config.errorHandler = function (err, vm, info) {
  window.tgLogger.error(err + vm + info)
}
Vue.config.warnHandler = function (msg, vm, trace) {
  window.tgLogger.warn(msg + vm + trace)
}

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
