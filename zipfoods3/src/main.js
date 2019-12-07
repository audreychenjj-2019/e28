import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import ProductsPage from './components/pages/ProductsPage.vue';
import HomePage from './components/pages/HomePage.vue';
import CategoriesPage from './components/pages/CategoriesPage.vue';
import ProductPage from './components/pages/ProductPage.vue';
import CartPage from './components/pages/CartPage.vue';
import ProductCreatePage from './components/pages/ProductCreatePage.vue';
import NotFoundPage from './components/pages/NotFoundPage.vue';
import store from './store'
import './filters.js';
import Vuelidate from 'vuelidate';

/* eslint-disable no-unused-vars */
const _ = require('lodash')
/* eslint-enable no-unused-vars */

Vue.use(VueRouter);
Vue.use(Vuelidate);
Vue.config.productionTip = false

/*----------------------------------------------------
ROUTING
-----------------------------------------------------*/
const routes = [
    { path: '/', component: HomePage, name: 'home' },
    { path: '/products', component: ProductsPage, name: 'products' },
    { path: '/product/create', component: ProductCreatePage, name: 'create' },
    { path: '/product/:slug', component: ProductPage, name: 'product', props: true },
    { path: '/categories', component: CategoriesPage, name: 'categories' },
    { path: '/cart', component: CartPage, name: 'cart' },
    // https://router.vuejs.org/guide/essentials/history-mode.html#caveat
    { path: '*', component: NotFoundPage }
]

const router = new VueRouter({
    routes: routes,
    mode: 'history'
});


/*----------------------------------------------------
ROOT VUE INSTANCE
-----------------------------------------------------*/
new Vue({
    router: router,
    store: store,
    render: h => h(App),
}).$mount('#app')
