export { default as Portfolio } from "@/Portfolio.js";

export const axios = require("axios");

export const config = {
    stockListUrl: "https://financialmodellingprep.com/api/v3/company/stock/list",
    majorIndexesUrl: "https://financialmodelingprep.com/api/v3/majors-indexes",
    mostActiveStockUrl: "https://financialmodelingprep.com/api/v3/stock/actives",
    mostGainerStockUrl: "https://financialmodelingprep.com/api/v3/stock/gainers",
    mostLoserStockUrl: "https://financialmodelingprep.com/api/v3/stock/losers",
    sectorPerformanceUrl: "https://financialmodelingprep.com/api/v3/stock/sectors-performance",
    baseProfileUrl: "https://financialmodellingprep.com/api/v3/company/profile/",
    baseIndexComponentUrl: "https://my-json-server.typicode.com/audreychenjj-2019/p3-symbolslist-api/symbols?symbol=",
    companyKeyMetricsBaseUrl: "https://financialmodelingprep.com/api/v3/company-key-metrics/",
    companiesPriceListUrl: "https://financialmodelingprep.com/api/v3/stock/real-time-price/",
    newsHeadlinesURL: "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=fc91a66d03df4616b61b5b245a51fb7d"
};
