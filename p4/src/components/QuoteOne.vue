<template>
    <div id="QuoteOne" class="quote-one-page">
        <div v-if="isIndex == true" class="table-cell quote-table-cell quote-cell-name">
            <p v-bind:class="'characters'">{{ display.name }}</p>
        </div>
        <div v-else class="table-cell quote-table-cell quote-cell-name">
            <router-link
                data-test="router-link-index-or-stock"
                v-bind:class="'router'"
                :to="{ name: 'research', params: { symbolId: display.name } }"
            >
                <p v-bind:class="'characters'">{{ display.name }}</p>
            </router-link>
        </div>
        <div class="table-cell quote-table-cell quote-cell-price">
            <p v-bind:class="[display.quoteClass]">{{ display.quote }}</p>
        </div>
        <div class="table-cell quote-table-cell quote-cell-change-percent">
            <p v-bind:class="[display.changePercentClass]">{{ display.changePercent }}%</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "QuoteOne",
        props: {
            security: { type: Object, required: true },
            isIndex: { type: Boolean, required: false, default: false }
        },

        computed: {
            display: function() {
                return Object.assign(
                    {},
                    {
                        name: this.isIndex ? this.security.indexName : this.security.ticker,
                        quote: this.security.price,
                        quoteClass: (this.security.changes > 0 ? "increase" : "decrease") + " " + "numbers",
                        changePercent: (
                            (100 * this.security.changes) /
                            (this.security.changes + parseFloat(this.security.price))
                        ).toFixed(2),
                        changePercentClass: (this.security.changes > 0 ? "positive" : "negative") + " " + "numbers"
                    }
                );
            }
        }
    };
</script>

<style scoped>
    .table-cell {
        vertical-align: top;
        display: table-cell;
        border-top: solid 1px silver;
        padding-left: 5px;
        padding-right: 5px;
    }

    .quote-table-cell {
        vertical-align: top;
        width: 90px;
        padding-left: 5px;
        padding-right: 5px;
    }

    .increase::after {
        content: "\25b2";
        color: green;
    }

    .decrease::after {
        content: "\25bc";
        color: red;
    }

    .positive {
        color: green;
    }

    .negative {
        color: red;
    }

    .characters {
        text-align: left;
    }

    .numbers {
        text-align: right;
    }
</style>
