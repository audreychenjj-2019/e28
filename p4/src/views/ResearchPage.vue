<template>
    <div id="research-page" class="research-page">
        <div class="autocomplete-show">
            <auto-complete v-on:symbolentered="symbolEntered" />
        </div>

        <div class="button-add-to-portfolio" v-if="symbol && symbol != ''">
            <router-link :to="{ name: 'portfolio', params: { symbolToAdd: symbol } }">
                <button data-test="button-add-to-profile">Add To Portfolio</button>
            </router-link>

            <show-research :symbolId="symbol" v-bind:key="symbol"></show-research>
        </div>
    </div>
</template>

<script>
    import AutoComplete from "@/components/AutoComplete.vue";
    import ShowResearch from "@/components/ShowResearch.vue";

    export default {
        name: "ResearchPage",
        props: ["symbolId"],
        components: {
            "auto-complete": AutoComplete,
            "show-research": ShowResearch
        },
        data: function() {
            return {
                symbol: ""
            };
        },
        computed: {
            lastResearchedSymbol: function() {
                return this.$store.state.lastResearchedSymbol;
            }
        },
        methods: {
            symbolEntered: function(symbol) {
                if (this.symbol != symbol && symbol != "") {
                    this.symbol = symbol;
                    this.$router.push({
                        name: "research",
                        params: { symbolId: this.symbol }
                    });
                }
            }
        },
        mounted() {
            if (this.symbolId) {
                this.symbol = this.symbolId.toUpperCase();
            } else if (this.lastResearchedSymbol != "") {
                this.symbol = this.lastResearchedSymbol;
            }
        }
    };
</script>

<style scoped>
    .research-page {
        padding: 5px;
    }

    .autocomplete-show {
        display: inline-block;
    }
</style>
