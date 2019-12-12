<template>
	<div id="TopQuotes" class="top-quotes">
		<quotes-box :url="sharedState.mostGainerStockUrl" :title="'Top Gainers'" :topX="5"></quotes-box>

		<quotes-box :url="sharedState.mostLoserStockUrl" :title="'Top Losers'" :topX="5"></quotes-box>

		<quotes-box :url="sharedState.mostActiveStockUrl" :title="'Most Active Trades'" :topX="5"></quotes-box>
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
			sharedState: app.config
		};
	},
	mounted() {}
};
</script>

<style scoped>
.top-quotes {
	font-size: larger;
}
</style>
