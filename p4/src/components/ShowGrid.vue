<template>
    <div id="ShowGrid" class="showgrid-component">
        <div class="table-overall portfolio-table">
            <div class="table-header-row">
                <div class="table-cell" v-for="(heading, column) in tableHeadings" v-bind:key="column">{{ heading }}</div>
            </div>
            <div class="table-cell table-cell-last"></div>

            <div v-for="(row, index) in holdings" v-bind:key="index">
                <portfolio-row
                    :holdingsRow="holdings[index]"
                    :portfolioRow="portfolioRows[index]"
                    @editConfirmPressed="updateToPortfolio"
                    @deletePressed="removeFromPortfolio"
                />
            </div>

            <new-holding-row :symbolToAdd="symbolToAdd" @addConfirmPressed="addToPortfolio" />
        </div>
    </div>
</template>

<script>
    import PortfolioRow from "@/components/PortfolioRow.vue";
    import NewHolding from "@/components/NewHolding.vue";

    export default {
        name: "ShowGrid",
        components: {
            "portfolio-row": PortfolioRow,
            "new-holding-row": NewHolding
        },
        props: {
            symbolToAdd: { type: String, required: false, default: "" },
            holdings: { type: Array, required: true, default: () => [] },
            portfolioRows: { type: Array, required: true, default: () => [] }
        },
        data: function() {
            return {
                tableHeadings: ["Symbol", "#Shares", "$ Cost/Share", "Total Cost", "Market Price", "Total Market Value", "Profit/Loss"]
            };
        },
        methods: {
            addToPortfolio: function(newHolding) {
                this.$emit("addToPortfolio", newHolding);
                if (this.symbolToAdd != "") {
                    this.$router.push({ name: "portfolio" });
                }
            },
            updateToPortfolio: function() {
                this.$emit("updateToPortfolio", this.holdings);
            },
            removeFromPortfolio: function(symbol) {
                this.$emit("removeFromPortfolio", symbol);
            },
            showAlert: function(alertType, alertMessage, seconds) {
                this.alert = true;
                this.alertType = alertType;
                this.alertMessage = alertMessage;
                setTimeout(() => (this.alert = false), seconds);
            }
        },
        mounted() {
            if (this.holdings.length == 0) {
                this.showAlert("alertinfo", "Click Add begin", 5000);
            }
        }
    };
</script>

<style scoped>
    .showgrid-component {
        width: 100%;
    }

    .table-overall {
        width: 100%;
        text-align: center;
    }

    .table-row {
        border: solid 1px silver;
    }

    .table-header-row {
        color: white;
        font-size: larger;
        font-weight: bold;
    }

    .table-cell {
        width: 12%;
        background-color: #0074d9;
        float: left;
        min-height: 50px;
        padding-bottom: 0.5%;
        padding-top: 0.5%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .table-cell-last {
        width: 15%;
    }
</style>
