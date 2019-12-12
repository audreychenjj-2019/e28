<template>
	<div class="today">
		<div class="Table today-table">
			<div class="Title">
				<!-- <p>This is a Table</p> -->
			</div>
			<div class="Row">
				<div class="Cell today-table-td today-index-column">
					<index-sector />
				</div>
				<div class="Cell today-table-td today-top-charts-column">
					<top-quotes />
				</div>
				<div class="Cell today-table-td today-table-td-news-width">
					<news-headlines />
				</div>
			</div>
		</div>
		<div align="left">Sources: FinancialModelingPrep, NewsAPI</div>
	</div>
</template>

<script>
// @ is an alias to /src
import IndexSector from "@/components/IndexSector.vue";
import TopQuotes from "@/components/TopQuotes.vue";
import NewsHeadlines from "@/components/NewsHeadlines.vue";

export default {
	name: "today",
	components: {
		"index-sector": IndexSector,
		"top-quotes": TopQuotes,
		"news-headlines": NewsHeadlines
	}
};
</script>

<style scoped>
.Table {
	display: table;
}
.Title {
	display: table-caption;
	/* text-align: center;
		font-weight: bold;
		font-size: larger; */
}
.Heading {
	display: table-row;
	/* font-weight: bold;
		text-align: center; */
}
.Row {
	display: table-row;
}
.Cell {
	display: table-cell;
	vertical-align: top;
	/* border-top: solid 1px silver;
		padding-left: 5px;
		padding-right: 5px; */
}
.today-table {
	width: 100%;
	/* border: 1px solid gray; */
}

.today-table-td {
	/* border: 1px solid gray; */
	vertical-align: top;
	text-align: center;
}

.today-index-column {
	width: 20%;
}

.today-top-charts-column {
	width: 15%;
}

.today-table-td-news-width {
	min-width: 65%;
	padding-left: 60px;
}
</style>
