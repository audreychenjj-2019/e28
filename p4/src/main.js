import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import * as firebase from "firebase";
import Vuelidate from "vuelidate";

import GlobalFunctions from "@/mixins/GlobalFunctions.js";

Vue.use(Vuelidate);

Vue.mixin(GlobalFunctions);

Vue.config.productionTip = false;

const configOptions = {
    apiKey: "AIzaSyBmySnBB4SAiUaH-_-ZZd0TpQUTHhn8QbI",
    authDomain: "p4-stocks.firebaseapp.com",
    databaseURL: "https://p4-stocks.firebaseio.com",
    projectId: "p4-stocks",
    storageBucket: "p4-stocks.appspot.com",
    messagingSenderId: "909312102362",
    appId: "1:909312102362:web:434238b8fd91c86ee4bae3"
};

firebase.initializeApp(configOptions);

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        store.dispatch("fetchUser", user);
        const db = firebase.database();
        store.commit("setDatabaseReference", db);
    }
});

// export const db = firebase.database();

// store.commit("setDatabaseReference", firebase.database());

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
