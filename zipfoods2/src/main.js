import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import HomePage from "./components/pages/HomePage.vue";
import ProductsPage from "./components/pages/ProductsPage.vue";
import ProductPage from "./components/pages/ProductPage.vue";
import CategoriesPage from "./components/pages/CategoriesPage.vue";
import CartPage from "./components/pages/CartPage.vue";

import store from "./store";

Vue.use(VueRouter);

Vue.config.productionTip = false;

// src/main.js
const routes = [
	{ path: "/", component: HomePage, name: "home" },
	{ path: "/products", component: ProductsPage, name: "products" },
	{
		path: "/product/:id",
		component: ProductPage,
		name: "product",
		props: true
	}, //route segment
	{ path: "/categories", component: CategoriesPage, name: "categories" },
	{ path: "/cart", component: CartPage, name: "cart" }
];

const router = new VueRouter({
	routes: routes,
	mode: "history" //by default it is 'hash'
});

new Vue({
	router: router,
	store: store, //this.$store
	render: h => h(App)
}).$mount("#app");
