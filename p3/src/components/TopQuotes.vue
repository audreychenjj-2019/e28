<template>
	<div id="topquotes">
		<h1></h1>
		<div class="td">
			<div class="Table" v-if="stockList">
				<div class="Title">
					<p>{{ title }}</p>
				</div>
				<div
					class="Row"
					v-for="(stock, index) in stockList.slice(0, topX)"
					v-bind:key="index"
				>
					<div v-if="isIndex == true" class="Cell">
						<p v-bind:class="'characters'">{{ stock.indexName }}</p>
					</div>
					<div v-else class="Cell">
						<router-link
							v-bind:class="'router'"
							:to="{ name: 'research', params: { symbolId: stock.ticker } }"
						>
							<p v-bind:class="'characters'">{{ stock.ticker }}</p>
						</router-link>
					</div>
					<div class="Cell">
						<p
							v-bind:class="[
								stock.changes > 0 ? 'increase' : 'decrease',
								'numbers'
							]"
						>
							{{ stock.price }}
						</p>
					</div>
					<div class="Cell">
						<p
							v-bind:class="[
								stock.changes > 0 ? 'positive' : 'negative',
								'numbers'
							]"
						>
							{{
								(
									(100 * stock.changes) /
									(stock.changes + parseFloat(stock.price))
								).toFixed(2)
							}}%
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "topquotes",
		props: ["stockList", "topX", "isIndex", "title"],
		data: function() {
			return {};
		}
	};
</script>

<style scoped>
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
	.Row:hover {
		background-color: whitesmoke;
	}
	.increase::after {
		content: "\25b2";
		color: green;
	}
	.decrease::after {
		content: "\25bc";
		color: red;
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
	.router {
		column-width: inherit;
	}
</style>
