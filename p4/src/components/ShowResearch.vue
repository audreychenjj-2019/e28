<template>
    <div id="show-research">
        <div v-if="symbol && symbol != ''">
            <show-profile v-if="companyProfile" :symbolId="symbol" :companyProfile="companyProfile" :indexComponent="indexComponent"></show-profile>
            <div v-else>Loading company profile data ...</div>

            <show-metrics v-if="companyKeyMetrics" :companyKeyMetrics="companyKeyMetrics"></show-metrics>
        </div>
    </div>
</template>

<script>
    import * as app from "@/app.js";
    import ShowProfile from "@/components/ShowProfile.vue";
    import ShowMetrics from "@/components/ShowMetrics.vue";

    export default {
        name: "ShowResearch",
        props: ["symbolId"],
        components: {
            "show-profile": ShowProfile,
            "show-metrics": ShowMetrics
        },
        data: function() {
            return {
                symbol: "",
                companyProfile: null,
                indexComponent: null,
                companyKeyMetrics: null
            };
        },
        computed: {
            lastResearchedSymbol: function() {
                return this.$store.state.lastResearchedSymbol;
            },
            lastResearchedSymbolMetrics: function() {
                return this.$store.state.lastResearchedSymbolMetrics;
            },
            lastResearchedSymbolProfile: function() {
                return this.$store.state.lastResearchedSymbolProfile;
            }
        },
        mounted() {
            this.symbol = this.symbolId;

            if (this.symbolId == this.lastResearchedSymbol && this.lastResearchedSymbolProfile) {
                this.companyProfile = this.lastResearchedSymbolProfile;
            } else {
                app.axios.get(app.config.baseProfileUrl + this.symbolId).then(response => {
                    this.companyProfile = response.data.profile;
                    this.$store.commit("setLastResearchedSymbol", this.symbolId);
                    this.$store.commit("setLastResearchedSymbolProfile", this.companyProfile);
                }),
                    error => {
                        window.console.error(error);
                    };
            }
            app.axios.get(app.config.baseIndexComponentUrl + this.symbol).then(response => {
                if (response.data.length > 0) {
                    this.indexComponent = response.data[0].index;
                }
            });

            if (this.symbolId == this.lastResearchedSymbol && this.lastResearchedSymbolMetrics) {
                this.companyKeyMetrics = this.lastResearchedSymbolMetrics;
            } else {
                app.axios.get(app.config.companyKeyMetricsBaseUrl + this.symbolId).then(response => {
                    this.companyKeyMetrics = response.data.metrics;
                    this.$store.commit("setLastResearchedSymbolMetrics", this.companyKeyMetrics);
                }),
                    error => {
                        window.console.error(error);
                    };
            }
        }
    };
</script>
