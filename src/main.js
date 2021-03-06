import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import VueResource from 'vue-resource'
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css/normalize.css'
import 'lib-flexible'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueResource)
Vue.http.options.emulateJSON = true;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')