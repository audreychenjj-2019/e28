import Vue from "vue";
import VueRouter from "vue-router";
import TodayPage from "@/views/TodayPage.vue";

Vue.use(VueRouter);

function lazyLoad(view) {
    return () => import(`@/views/${view}.vue`);
}

const routes = [
    { path: "/", component: TodayPage, name: "today" },
    {
        path: "/research/:symbolId?",
        component: lazyLoad("ResearchPage"),
        name: "research",
        props: true
    },
    {
        path: "/portfolio/:symbolToAdd?",
        component: lazyLoad("PortfolioPage"),
        name: "portfolio",
        props: true
    },
    {
        path: "/account",
        component: lazyLoad("AccountPage"),
        name: "account"
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
