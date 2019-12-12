<template>
	<div id="IndexSector" class="index-sector">
		<quotes-box
			:url="sharedState.majorIndexesUrl"
			:title="'Top US Indexes'"
			:topX="3"
			:isIndex="true"
		></quotes-box>

		<div class="Table" v-if="sectorPerformanceList">
			<div class="Title">
				<p>Sector-Wise Performance</p>
			</div>
			<div class="Row" v-for="(sector, index) in sectorPerformanceList" v-bind:key="index">
				<div class="Cell">
					<p
						v-bind:class="[
										'characters',
										parseFloat(sector.changesPercentage) > 0
											? 'increasetext'
											: 'decreasetext'
									]"
					>{{ sector.sector }}</p>
				</div>
				<div class="Cell">
					<p
						v-bind:class="[
										parseFloat(sector.changesPercentage) > 0
											? 'positive'
											: 'negative',
										'numbers'
									]"
					>{{ parseFloat(sector.changesPercentage).toFixed(2) }}%</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import * as app from "@/app.js";
import QuotesBox from "@/components/QuotesBox.vue";

export default {
	name: "IndexSector",
	components: {
		"quotes-box": QuotesBox
	},
	data: function() {
		return {
			majorIndexesList: null,
			sectorPerformanceList: null,
			sharedState: app.config
		};
	},
	methods: {
		sortByProperty: function(array, key) {
			return array.sort(function(a, b) {
				var x = parseFloat(a[key].replace(/[()]/g, ""));
				var y = parseFloat(b[key].replace(/[()]/g, ""));
				return x > y ? -1 : x < y ? 1 : 0;
			});
		}
	},
	mounted() {
		app.axios.get(app.config.majorIndexesUrl).then(response => {
			this.majorIndexesList = response.data.majorIndexesList;
		});
		app.axios.get(app.config.sectorPerformanceUrl).then(response => {
			this.sectorPerformanceList = response.data.sectorPerformance;
		});
	}
};
</script>

<style scoped>
.index-sector {
	font-size: larger;
}
.Table {
	display: table;
}
.Title {
	display: table-caption;
	text-align: center;
	font-weight: bold;
	font-size: larger;
}
.Heading {
	display: table-row;
	font-weight: bold;
	text-align: center;
}
.Row {
	display: table-row;
}
.Cell {
	vertical-align: top;
	display: table-cell;
	border-top: solid 1px silver;
	padding-left: 5px;
	padding-right: 5px;
}
.increasetext::before {
	content: "\25b2";
	color: green;
}
.decreasetext::before {
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