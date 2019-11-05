import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import ShowProducts from "./components/ShowProducts";
import ShowCategories from "./components/ShowCategories.vue";
import ShowHome from "./components/ShowHome.vue";

Vue.use(VueRouter);

Vue.config.productionTip = false

// src/main.js
const routes = [
  { path: '/', component: ShowHome },
  { path: '/products', component: ShowProducts },
  { path: '/categories', component: ShowCategories }
]

const router = new VueRouter(
  {
    routes: routes,
    mode: 'history', //by default it is 'hash'
  }
)

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
