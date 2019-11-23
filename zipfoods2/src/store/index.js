import Vue from "vue";
import Vuex from "vuex";
import * as app from "./../app.js";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		cartCount: 0,
		products: []
	},
	mutations: {
		//must never contain asynchronous requests. async requests go into actions. when we get responses, we invoke mutations to change state.
		setCartCount(state, payload) {
			state.cartCount = payload;
		},
		updateCartCount(state, payload) {
			state.cartCount += payload;
		},
		setProducts(state, payload) {
			state.products = payload;
		}
	},
	actions: {
		setProducts(context) {
			app.axios.get(app.config.api + "products").then(response => {
				context.commit("setProducts", response.data);
			});
		}
	},
	getters: {
		//use getters to get specific items within the state that the actions might have already brought over.
		getProductById(state) {
			// this function will return a function which can get more parameters
			return function(id) {
				return state.products.find(product => product.id == id);
			};
		}
	}
});
