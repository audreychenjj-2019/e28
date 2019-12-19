<template>
    <div id="TopQuotes" class="top-quotes">
        <quotes-box v-if="topGainerList" :topList="topGainerList" :title="'Top Gainers'" :topX="5"></quotes-box>
        <div v-else>Loading Top Gainers ...</div>

        <quotes-box v-if="topLoserList" :topList="topLoserList" :title="'Top Losers'" :topX="5"></quotes-box>
        <div v-else>Loading Top Losers ...</div>

        <quotes-box v-if="topActiveList" :topList="topActiveList" :title="'Most Active Trades'" :topX="5"></quotes-box>
        <div v-else>Loading Top Actives ...</div>
    </div>
</template>

<script>
    import QuotesBox from "@/components/QuotesBox.vue";
    import * as app from "@/app.js";

    export default {
        name: "TopQuotes",
        components: {
            "quotes-box": QuotesBox
        },
        data: function() {
            return {
                topGainerList: null,
                topLoserList: null,
                topActiveList: null
            };
        },
        methods: {
            sortByProperty: function(array, key) {
                return array.sort(function(a, b) {
                    var x = Math.abs(parseFloat(a[key].replace(/[()]/g, "")));
                    var y = Math.abs(parseFloat(b[key].replace(/[()]/g, "")));
                    return x > y ? -1 : x < y ? 1 : 0;
                });
            }
        },
        mounted() {
            app.axios.get(app.config.mostGainerStockUrl).then(response => {
                this.topGainerList = this.sortByProperty(response.data[Object.keys(response.data)[0]], "changesPercentage");
            });

            app.axios.get(app.config.mostLoserStockUrl).then(response => {
                this.topLoserList = this.sortByProperty(response.data[Object.keys(response.data)[0]], "changesPercentage");
            });

            app.axios.get(app.config.mostActiveStockUrl).then(response => {
                this.topActiveList = this.sortByProperty(response.data[Object.keys(response.data)[0]], "changesPercentage");
            });
        }
    };
</script>

<style scoped>
    .top-quotes {
        font-size: larger;
    }
</style>
