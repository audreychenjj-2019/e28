<template>
	<div id="portfolio-page" class="portfolio-page">
		<label class="portfolio-heading" align="left">
			Portfolio Holdings - Current Market Value $
			<label
				v-bind:key="totalValue"
			>{{ format(totalValue, 2) }}</label>
		</label>
		<router-link :to="{name: 'account'}" class="button-save-to-portfolio">
			<button
				:disabled="modeEditConfirm=='Confirm' || modeAddConfirm=='Confirm' || holdings.length==0"
			>Save To My Account</button>
		</router-link>
		<button
			class="button-add"
			:disabled="modeAddConfirm=='Confirm' || holdings.length==0"
			v-if="modeEditConfirm"
			v-on:click="editConfirmPressed"
		>{{ modeEditConfirm }}</button>
		<br />
		<table class="portfolio-table">
			<tr>
				<th v-for="(heading, column) in tableHeadings" v-bind:key="column">{{ heading }}</th>
			</tr>
			<tr v-for="(row, index) in portfolioRows" v-bind:key="index">
				<td v-for="(value, key) in row" v-bind:key="key">
					<label v-if="key == 'symbol'">
						<router-link :to="{ name: 'research', params: { symbolId: value } }">{{ value }}</router-link>
					</label>
					<label v-else-if=" modeEditConfirm == 'Confirm' && (key == 'shares' || key == 'cost') ">
						<input v-model.number="holdings[index][key]" />
					</label>
					<label v-else>{{ value }}</label>
				</td>
				<td>
					<button
						:disabled="modeAddConfirm=='Confirm' || modeEditConfirm=='Confirm'"
						v-on:click="deletePressed(row.symbol)"
					>Delete</button>
				</td>
			</tr>
			<tr v-if="modeAddConfirm == 'Confirm'">
				<td>
					<auto-complete
						v-if="symbolToAdd==''"
						:showButton="false"
						:showLabel="false"
						v-on:symbolentered="symbolEntered"
					/>
					<label v-else>
						<router-link
							:to="{ name: 'research', params: { symbolId: newRow.symbol } }"
						>{{ newRow.symbol }}</router-link>
					</label>
				</td>
				<td>
					<input v-model.number="newRow.shares" />
				</td>
				<td>
					<input v-model.number="newRow.cost" />
				</td>
				<button v-on:click="cancelPressed()">Cancel</button>
			</tr>
		</table>
		<button
			:disabled="modeEditConfirm=='Confirm' || (modeAddConfirm == 'Confirm' && (newRow.symbol == '' || !newRow.shares>0))"
			v-on:click="addConfirmPressed"
		>{{ modeAddConfirm }}</button>
		<transition name="fade">
			<div :class="alertType" v-if="alert">{{ alertMessage }}</div>
		</transition>
	</div>
</template> <script>
import * as app from "@/app.js";
import AutoComplete from "@/components/AutoComplete.vue";
export default {
	name: "Portfolio-Page",
	components: { "auto-complete": AutoComplete },
	props: { symbolToAdd: { type: String, required: false, default: "" } },
	data: function() {
		return {
			Portfolio: null,
			holdings: [],
			newRow: {},
			companiesPriceList: null,
			modeEditConfirm: "Edit",
			modeAddConfirm: "Add",
			tableHeadings: [
				"Symbol",
				"#Shares",
				"$ Cost/Share",
				"Total Cost",
				"Market Price",
				"Total Market Value",
				"Profit/Loss"
			],
			alertType: "",
			alert: false,
			alertMessage: ""
		};
	},
	computed: {
		symbolsList: function() {
			return Array.from(
				new Set(this.holdings.map(holding => holding.symbol))
			);
		},
		totalValue: function() {
			return this.portfolioRows
				? this.portfolioRows.reduce(
						(accumulator, row) => accumulator + row.marketValue,
						0
				  )
				: 0;
		},
		portfolioRows: function() {
			return this.holdings && this.companiesPriceList
				? this.holdings.map(holding => ({
						symbol: holding.symbol,
						shares: holding.shares,
						cost: holding.cost,
						totalCost: holding.shares * holding.cost,
						marketPrice: this.companiesPriceList.find(
							c => c.symbol == holding.symbol
						).price,
						marketValue: Number(
							(
								holding.shares *
								this.companiesPriceList.find(
									c => c.symbol == holding.symbol
								).price
							).toFixed(2)
						),
						profit: Number(
							(
								holding.shares *
									this.companiesPriceList.find(
										c => c.symbol == holding.symbol
									).price -
								holding.shares * holding.cost
							).toFixed(2)
						)
				  }))
				: null;
		}
	},
	methods: {
		symbolEntered: function(symbol) {
			this.newRow.symbol = symbol;
		},
		editConfirmPressed: function() {
			if (this.modeEditConfirm == "Confirm") {
				this.updateToPortfolio(this.holdings);
				this.modeEditConfirm = "Edit";
				this.modeAddConfirm = "Add";
				this.getMarketPrice();
			} else {
				this.modeEditConfirm = "Confirm";
			}
		},
		addConfirmPressed: function() {
			if (this.modeAddConfirm == "Add") {
				this.newRow = { symbol: "", shares: 0, cost: 0 };
				if (this.symbolToAdd != "") {
					this.newRow.symbol = this.symbolToAdd.toUpperCase();
				}
				this.modeAddConfirm = "Confirm";
			} else if (this.modeAddConfirm == "Confirm") {
				if (this.newRow.symbol == "") {
					this.showAlert("alertbad", "Choose symbol", 2500);
				} else if (this.newRow.shares == 0) {
					this.showAlert("alertbad", "Type number of shares", 2500);
				} else {
					this.addToPortfolio(this.newRow);
					this.modeAddConfirm = "Add";
					this.modeEditConfirm = "Edit";
					if (this.symbolToAdd != "") {
						this.$router.push({ name: "portfolio" });
					}
				}
			}
		},
		cancelPressed: function() {
			if (this.modeAddConfirm == "Confirm") {
				this.newRow = { symbol: "", shares: 0, cost: 0 };
				this.modeAddConfirm = "Add";
			}
			if (this.holdings.length > 0) {
				this.modeEditConfirm = "Edit";
			}
			if (this.symbolToAdd != "") {
				this.$router.go(-1);
			}
		},
		deletePressed: function(symbol) {
			if (this.modeAddConfirm == "Add") {
				this.removeFromPortfolio(symbol);
			}
			if (this.holdings.length > 0) {
				this.modeEditConfirm = "Edit";
			}
			if (this.symbolToAdd != "") {
				this.$router.push({ name: "portfolio" });
			}
		},
		updateToPortfolio: function() {
			this.Portfolio.update();
			this.holdings = this.Portfolio.getHoldings();
			this.getMarketPrice();
			this.$store.commit("setHoldings", this.holdings);
			this.showAlert("alertgood", "Portfolio up to date", 1500);
		},
		addToPortfolio: function(newRow) {
			this.Portfolio.add(newRow);
			this.holdings = this.Portfolio.getHoldings();
			this.$store.commit("setHoldings", this.holdings);
			this.getMarketPrice();
			this.showAlert(
				"alertgood",
				newRow.symbol + " is added to your Portfolio",
				1500
			);
		},
		removeFromPortfolio: function(symbol) {
			this.Portfolio.remove(symbol);
			this.holdings = this.Portfolio.getHoldings();
			this.$store.commit("setHoldings", this.holdings);
			this.getMarketPrice();
			this.showAlert(
				"alertgood",
				symbol + " is removed from your Portfolio",
				1500
			);
		},
		getMarketPrice: function() {
			this.companiesPriceList = null;
			if (this.holdings && this.holdings.length > 0) {
				app.axios
					.get(app.config.companiesPriceListUrl + this.symbolsList)
					.then(response => {
						if (this.holdings.length > 1) {
							this.companiesPriceList =
								response.data.companiesPriceList;
						} else {
							this.companiesPriceList = [];
							this.companiesPriceList.push(response.data);
						}
					});
			}
		},
		showAlert: function(alertType, alertMessage, seconds) {
			this.alert = true;
			this.alertType = alertType;
			this.alertMessage = alertMessage;
			setTimeout(() => (this.alert = false), seconds);
		}
	},
	mounted() {
		this.Portfolio = new app.Portfolio();
		this.holdings = this.Portfolio.getHoldings();
		this.$store.commit("setHoldings", this.holdings);
		if (this.holdings.length > 0) {
			this.getMarketPrice();
		} else if (this.holdings.length == 0) {
			this.showAlert("alertinfo", "Click Add begin", 5000);
		}
		if (this.symbolToAdd != "") {
			this.addConfirmPressed();
		}
	}
};
</script> <style scoped>
.button-save-to-portfolio {
	text-decoration: none;
}
.portfolio-page {
	border-radius: 5px;
	border: 3px solid #0074d9;
	width: 100%;
}
.portfolio-heading {
	float: left;
	font-size: x-large;
}
.portfolio-table {
	float: none;
}
.portfolio-page button {
	display: block;
	margin: 10px auto;
	font-size: 1.5rem;
}
#portfolio-page td,
#portfolio-page th {
	padding: 8px;
}
#portfolio-page th {
	padding-left: 75px;
	padding-right: 75px;
	text-align: center;
	background-color: #0074d9;
	color: white;
}
</style> 