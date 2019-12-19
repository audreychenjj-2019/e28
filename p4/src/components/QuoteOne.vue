<template>
    <div id="QuoteOne" data-test="quote-one-page" class="quote-one-page">
        <div v-if="isIndex == true" class="table-cell">
            <p :class="'characters'">{{ display.name }}</p>
        </div>
        <div v-else class="table-cell">
            <router-link
                data-test="router-link-index-or-stock"
                :class="'router'"
                :to="{ name: 'research', params: { symbolId: display.name } }"
            >
                <p :class="'characters'">{{ display.name }}</p>
            </router-link>
        </div>
        <div class="table-cell">
            <p :class="[display.quoteClass]">{{ display.quote }}</p>
        </div>
        <div class="table-cell">
            <p :class="[display.changePercentClass]">{{ display.changePercent }}%</p>
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
                    name: this.isIndex
                        ? this.security.indexName
                        : this.security.ticker,
                    quote: this.security.price,
                    quoteClass:
                        (this.security.changes > 0 ? "increase" : "decrease") +
                        " " +
                        "numbers",
                    changePercent: (
                        (100 * this.security.changes) /
                        (this.security.changes +
                            parseFloat(this.security.price))
                    ).toFixed(2),
                    changePercentClass:
                        (this.security.changes > 0 ? "positive" : "negative") +
                        " " +
                        "numbers"
                }
            );
        }
    }
};
</script>

<style scoped>
.table-cell {
    display: table-cell;
    border-top: solid 1px silver;
    width: 31%;
    float: left;
    padding-left: 1%;
    padding-right: 1%;
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
