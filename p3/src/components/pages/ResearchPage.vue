<template>
	<div id="research-page">
		<h1></h1>
		<div v-if="sharedState.symbolsList">
			<auto-complete
				:showButton="true"
				:showLabel="true"
				:symbolId="symbol"
				v-on:symbolentered="symbolEntered"
			/>
		</div>

		<div v-if="symbol && symbol != ''">
			<router-link :to="{ name: 'portfolio', params: { symbolToAdd: symbol } }"
				><button>Add To Portfolio</button></router-link
			>

			<show-research :symbolId="symbol" v-bind:key="symbol"></show-research>
		</div>
	</div>
</template>

<script>
	import * as app from "./../../app.js";
	import AutoComplete from "./../AutoComplete.vue";
	import ShowResearch from "./../ShowResearch.vue";

	export default {
		name: "ResearchPage",
		props: ["symbolId"],
		components: {
			"auto-complete": AutoComplete,
			"show-research": ShowResearch
		},
		data: function() {
			return {
				symbol: "",
				sharedState: app.store
			};
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
			this.symbol = this.symbolId;
		}
	};
</script>
