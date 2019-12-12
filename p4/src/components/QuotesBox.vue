<template>
	<div id="QuotesBox">
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
import * as app from "@/app.js";
import QuoteOne from "@/components/QuoteOne.vue";

export default {
	name: "QuotesBox",
	components: {
		"quote-one": QuoteOne
	},
	props: {
		url: {
			type: String,
			required: true
		},
		title: {
			type: String,
			required: true
		},
		topX: {
			type: Number,
			required: false
		},
		isIndex: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	data: function() {
		return {
			topList: null
		};
	},
	methods: {
		sortByProperty: function(array, key) {
			return array.sort(function(a, b) {
				var x = Math.abs(parseFloat(a[key].replace(/[()]/g, "")));
				var y = Math.abs(parseFloat(b[key].replace(/[()]/g, "")));
				return x > y ? -1 : x < y ? 1 : 0;
			});
		}
	},
	mounted() {
		app.axios.get(this.url).then(response => {
			this.topList = this.isIndex
				? response.data[Object.keys(response.data)[0]]
				: this.sortByProperty(
						response.data[Object.keys(response.data)[0]],
						"changesPercentage"
				  );
		});
	}
};
</script>

<style scoped>
.top-quotes {
	align-items: center;
}

.quotes-box-title {
	/* display: table-caption; */
	text-align: center;
	font-weight: bold;
	font-size: larger;
}

/* .quotes-table {
	display: table;
} */

/* .quotes-table-row { */
/* display: table-row; */
/* border-top: solid 1px silver; */
/* } */

.quotes-table-row:hover {
	background-color: whitesmoke;
}
</style>
