<template>
    <div id="ShowPortfolio" class="show-portfolio">
        <div class="portfolio-heading" align="left">
            Portfolio Holdings - Current Market Value $
            <label v-bind:key="totalValue">{{ format(totalValue, 2) }}</label>
        </div>

        <show-grid
            :symbolToAdd="symbolToAdd"
            :holdings="holdings"
            :portfolioRows="portfolioRows"
            @updateToPortfolio="updateToPortfolio"
            @addToPortfolio="addToPortfolio"
            @removeFromPortfolio="removeFromPortfolio"
        />
    </div>
</template>

<script>
    import * as app from "@/app.js";
    import ShowGrid from "@/components/ShowGrid.vue";

    export default {
        name: "ShowPortfolio",
        components: { "show-grid": ShowGrid },
        props: { symbolToAdd: { type: String, required: false, default: "" } },
        data: function() {
            return { companiesPriceList: null, holdings: [], portfolioRows: [] };
        },
        computed: {
            symbolsList: function() {
                return Array.from(new Set(this.holdings.map(holding => holding.symbol)));
            },
            totalValue: function() {
                return this.portfolioRows
                    ? this.portfolioRows.reduce((accumulator, row) => accumulator + row.marketValue, 0)
                    : 0;
            }
        },
        watch: {
            holdings: {
                handler: function() {
                    if (this.holdings && this.holdings.length > 0) {
                        app.axios.get(app.config.companiesPriceListUrl + this.symbolsList).then(response => {
                            if (this.holdings.length > 1) {
                                this.companiesPriceList = response.data.companiesPriceList;
                            } else {
                                this.companiesPriceList = [];
                                this.companiesPriceList.push(response.data);
                            }
                        });
                    } else {
                        this.companiesPriceList = [];
                    }
                },
                deep: true
            },
            companiesPriceList: {
                handler: function() {
                    this.portfolioRows =
                        this.holdings && this.companiesPriceList
                            ? this.holdings.map(holding => ({
                                  symbol: holding.symbol,
                                  shares: holding.shares,
                                  cost: Number(holding.cost).toFixed(2),
                                  totalCost: Number(holding.shares * holding.cost).toFixed(2),
                                  marketPrice: this.companiesPriceList.find(c => c.symbol == holding.symbol).price,
                                  marketValue: Number(
                                      (
                                          holding.shares *
                                          this.companiesPriceList.find(c => c.symbol == holding.symbol).price
                                      ).toFixed(2)
                                  ),
                                  profit: Number(
                                      (
                                          holding.shares *
                                              this.companiesPriceList.find(c => c.symbol == holding.symbol).price -
                                          holding.shares * holding.cost
                                      ).toFixed(2)
                                  )
                              }))
                            : null;
                },
                deep: true
            }
        },
        methods: {
            updateToPortfolio: function() {
                this.Portfolio.update();
                this.updateGlobalHoldingsData();
            },
            addToPortfolio: function(newHolding) {
                this.Portfolio.add(newHolding);
                this.updateGlobalHoldingsData();
            },
            removeFromPortfolio: function(symbol) {
                this.Portfolio.remove(symbol);
                this.updateGlobalHoldingsData();
            },
            updateGlobalHoldingsData: function() {
                this.holdings = this.Portfolio.getHoldings();
                this.$store.commit("setHoldings", this.holdings);
            }
        },
        mounted() {
            this.Portfolio = new app.Portfolio();
            this.updateGlobalHoldingsData();
        }
    };
</script>

<style scoped>
    .show-portfolio {
        width: 100%;
    }
</style>
