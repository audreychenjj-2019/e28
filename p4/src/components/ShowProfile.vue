<template>
    <div id="showprofile">
        <h1></h1>
        <table v-if="companyProfile" class="company">
            <tr>
                <td>
                    <a v-bind:href="companyProfile.website" target="_blank">
                        <img class="company-thumb" :alt="'Company image of ' + symbolId" :src="companyProfile.image" />
                    </a>
                </td>
                <td>
                    <h2>Company profile</h2>
                    {{ companyProfile.sector }} > {{ companyProfile.industry }} >
                    <strong>
                        <a v-bind:href="companyProfile.website" target="_blank">{{ companyProfile.companyName }}</a>
                    </strong>
                    CEO: {{ companyProfile.ceo }}
                    <p>
                        ({{ companyProfile.exchange }}: {{ symbolId }})
                        <strong>${{ companyProfile.price }}</strong>
                        MCap: ${{ format(companyProfile.mktCap, 2) }} Beta: {{ format(companyProfile.beta, 2) }}
                        <span v-if="indexComponent">Index Component: {{ indexComponent }}</span>
                    </p>
                    <p>{{ companyProfile.description }}</p>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    import * as app from "@/app.js";

    export default {
        name: "showprofile",
        props: ["symbolId"],
        data: function() {
            return {
                companyProfile: null,
                indexComponent: null
            };
        },
        computed: {
            lastResearchedSymbol: function() {
                return this.$store.state.lastResearchedSymbol;
            },
            lastResearchedSymbolProfile: function() {
                return this.$store.state.lastResearchedSymbolProfile;
            }
        },
        mounted() {
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
        }
    };
</script>

<style scoped>
    .company {
        position: relative;
        margin: auto;
        width: 80%;
        background-color: whitesmoke;
        padding: 10px;
    }
</style>
