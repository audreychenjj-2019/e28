<template>
    <div id="QuotesBox" class="quotes-box">
        <div class="top-quotes" v-if="topList">
            <div class="quotes-box-title">
                <p>{{ title }}</p>
            </div>
            <div class="quotes-table">
                <div
                    class="quotes-table-row"
                    v-for="(security, index) in topList.slice(0, topX)"
                    v-bind:key="index"
                >
                    <quote-one :security="security" :isIndex="isIndex"></quote-one>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import QuoteOne from "@/components/QuoteOne.vue";

export default {
    name: "QuotesBox",
    components: { "quote-one": QuoteOne },
    props: {
        topList: { type: Array, required: true },
        title: { type: String, required: true },
        topX: { type: Number, required: false },
        isIndex: { type: Boolean, required: false, default: false }
    }
};
</script>

<style scoped>
.quotes-box {
    width: 100%;
    text-align: center;
}

.top-quotes {
    align-items: center;
}

.quotes-box-title {
    text-align: center;
    font-weight: bold;
    font-size: larger;
}

.quotes-table-row:hover {
    background-color: whitesmoke;
}
</style>
