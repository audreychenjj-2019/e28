import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import TodayPage from "./components/pages/TodayPage.vue";
import PortfolioPage from "./components/pages/PortfolioPage.vue";
import ResearchPage from "./components/pages/ResearchPage.vue";

Vue.use(VueRouter);

Vue.config.productionTip = false;

const routes = [
	{ path: "/", component: TodayPage, name: "today" },
	{
		path: "/portfolio/:symbolToAdd?",
		component: PortfolioPage,
		name: "portfolio",
		props: true
	},
	{
		path: "/research/:symbolId?",
		component: ResearchPage,
		name: "research",
		props: true
	}
];

const router = new VueRouter({
	routes: routes,
	mode: "history"
});

new Vue({
	router: router,
	render: h => h(App)
}).$mount("#app");
