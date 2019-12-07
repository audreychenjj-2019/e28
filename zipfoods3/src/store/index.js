import Vue from 'vue'
import Vuex from 'vuex'

import * as app from './../app.js';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cartCount: 0,
        products: null,
    },
    // Mutations are used to change state
    // Mutations can not be directly called; you commit them, e.g. store.commit('setProducts')
    // Mutations receive the state as the first argument
    // Mutations can receive a second argument, the payload
    // Mutations must be synchronous
    mutations: {
        setCartCount(state, payload) {
            state.cartCount = payload;
        },
        updateCartCount(state, payload) {
            state.cartCount += payload;
        },
        setProducts(state, payload) {
            state.products = payload;
        },
        addProduct(state, payload) {
            _.merge(state.products, payload)
        }
    },
    // Actions will not mutate state; instead they will commit mutations to mutate the state
    // Actions can contain arbitrary asynchronous operations
    // Actions receive a context object which exposes the same set of methods/properties on the store instance
    //     e.g. context.commit, context.state, context.getters
    // Actions are triggered with the store.dispatch method
    //     See App.vue for where this is dispatched ala this.$store.dispatch('setProducts');
    actions: {
        setProducts(context) {
            app.axios.get(app.config.api + 'products.json').then(response => {
                // https://stackoverflow.com/questions/39156533/firebase-database-returns-null-at-beginning-of-each-new-node
                context.commit('setProducts', response.data)
            });
        }
    },
    // Getters are used when we want to to compute derived state based on store state
    // "computed properties for stores"
    // A getter's result is cached based on its dependencies, and will only re-evaluate when 
    // some of its dependencies have changed.
    // Getters will receive the state as their 1st argument
    getters: {
        // https://vuex.vuejs.org/guide/getters.html#method-style-access
        getProductBySlug(state) {
            return function (slug) {
                return _.find(state.products, { 'slug': slug })
                //return state.products.find(product => product.id == id);
            }
        }
    }
})