import Vue from "vue";
import VueRouter from "vue-router";
import TodayPage from "@/views/TodayPage.vue";
import PortfolioPage from "@/views/PortfolioPage.vue";
import ResearchPage from "@/views/ResearchPage.vue";
import AccountPage from "@/views/AccountPage.vue";

Vue.use(VueRouter);

function lazyLoad(view) {
	return () => import(`@/views/${view}.vue`);
}

const routes = [
	{ path: "/", component: TodayPage, name: "today" },
	{
		path: "/research/:symbolId?",
		component: ResearchPage,
		name: "research",
		props: true
	},
	{
		path: "/portfolio/:symbolToAdd?",
		component: PortfolioPage,
		name: "portfolio",
		props: true
	},
	{
		path: "/account",
		component: AccountPage,
		name: "account"
	}
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

export default router;
