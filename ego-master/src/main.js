import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import instance from './instance'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$http = instance;

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
