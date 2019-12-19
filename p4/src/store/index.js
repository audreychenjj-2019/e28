import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        lastResearchedSymbol: "",
        lastResearchedSymbolProfile: null,
        lastResearchedSymbolMetrics: null,
        lastFoundArticles: null,
        symbolsList: [],
        totalValue: 0,
        portfolioRows: [],
        portfolioEditStatus: null,
        user: {
            uid: null,
            db: null,
            loggedIn: false,
            profile: null,
            holdings: []
        }
    },
    mutations: {
        setLastResearchedSymbol(state, payload) {
            state.lastResearchedSymbol = payload;
        },
        setLastResearchedSymbolProfile(state, payload) {
            state.lastResearchedSymbolProfile = payload;
        },
        setLastResearchedSymbolMetrics(state, payload) {
            state.lastResearchedSymbolMetrics = payload;
        },
        setLastFoundArticles(state, payload) {
            state.lastFoundArticles = payload;
        },
        setSymbolsList(state, payload) {
            state.symbolsList = payload;
        },
        setPortfolioRows(state, payload) {
            state.portfolioRows = payload;
        },
        setPortfolioEditStatus(state, payload) {
            state.portfolioEditStatus = payload;
        },
        setTotalValue(state, payload) {
            state.totalValue = payload;
        },
        setUID(state, payload) {
            state.user.uid = payload;
        },
        setDatabaseReference(state, payload) {
            state.user.db = payload;
        },
        setLoggedInStatus(state, payload) {
            state.user.loggedIn = payload;
        },
        setProfile(state, payload) {
            state.user.profile = payload;
        },
        setHoldings(state, payload) {
            state.user.holdings = payload;
        }
    },
    actions: {
        clearUserData(context) {
            context.commit("setUID", null);
            context.commit("setLoggedInStatus", false);
            context.commit("setProfile", null);
            context.commit("setHoldings", []);
            localStorage.setItem("portfolio", JSON.stringify([]));
        },
        fetchUser({ commit }, user) {
            commit("setLoggedInStatus", user !== null);
            if (user) {
                commit("setProfile", {
                    displayName: user.displayName,
                    email: user.email
                });
                commit("setUID", user.uid);
            } else {
                commit("setProfile", null);
            }
        },

        fetchHoldings({ commit, state }, user) {
            state.user.db
                .ref("/portfolios/" + user.uid)
                .once("value")
                .then(snapshot => {
                    let portfolio = localStorage.getItem("portfolio");
                    const holdingsInLocalStorage = portfolio ? JSON.parse(portfolio) : [];

                    const holdingsInDB = snapshot.child("holdings").val();

                    var union = holdingsInLocalStorage.concat(holdingsInDB);

                    if (union && union[0] == null) {
                        union = [];
                    }

                    if (union.length >= 2) {
                        for (var i = 0; i < union.length; i++) {
                            for (var j = i + 1; j < union.length; j++) {
                                if (union[i].symbol == union[j].symbol) {
                                    union[i].cost =
                                        (union[i].shares * union[i].cost + union[j].shares * union[j].cost) /
                                        (union[i].shares + union[j].shares);
                                    union[i].shares += union[j].shares;
                                    union.splice(j, 1);
                                    j--;
                                }
                            }
                        }
                    }

                    localStorage.setItem("portfolio", JSON.stringify(union));
                    commit("setHoldings", union);
                });
        }
    },
    getters: {
        user(state) {
            return state.user;
        },
        holdingsInStore(state) {
            return state.user.holdings;
        }
    },
    modules: {}
});
