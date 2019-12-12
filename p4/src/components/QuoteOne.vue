<template>
	<div id="QuoteOne" class="quote-one-page">
		<div v-if="isIndex == true" class="Cell quote-table-cell quote-cell-name">
			<p v-bind:class="'characters'">{{ security.indexName }}</p>
		</div>
		<div v-else class="Cell quote-table-cell quote-cell-name">
			<router-link
				v-bind:class="'router'"
				:to="{ name: 'research', params: { symbolId: security.ticker } }"
			>
				<p v-bind:class="'characters'">{{ security.ticker }}</p>
			</router-link>
		</div>
		<div class="Cell quote-table-cell quote-cell-price">
			<p
				v-bind:class="[
					security.changes > 0 ? 'increase' : 'decrease',
					'numbers'
				]"
			>{{ security.price }}</p>
		</div>
		<div class="Cell quote-table-cell quote-cell-change-percent">
			<p
				v-bind:class="[
					security.changes > 0 ? 'positive' : 'negative',
					'numbers'
				]"
			>{{ ((100 * security.changes) / (security.changes + parseFloat(security.price))).toFixed(2) }}%</p>
		</div>
	</div>
</template>

<script>
export default {
	name: "QuoteOne",
	props: {
		security: {
			type: Object,
			required: true
		},
		isIndex: {
			type: Boolean,
			required: false,
			default: false
		}
	},

	data: function() {
		return {};
	}
};
</script>

<style scoped>
.Cell {
	vertical-align: top;
	display: table-cell;
	border-top: solid 1px silver;
	padding-left: 5px;
	padding-right: 5px;
}

.quote-table-cell {
	vertical-align: top;
	/* display: table-cell;
	border-top: solid 1px silver; */
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
