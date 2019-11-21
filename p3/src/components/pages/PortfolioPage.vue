<template>
  <div id="portfolio-page" class="portfolio">
    <h2 align="left">Portfolio Holdings - Current Market Value ${{ format(totalValue,2) }}</h2>
    <button v-if="modeEditConfirm" v-on:click="editConfirmPressed">{{ modeEditConfirm }}</button>
    <table class="portfolioTable">
      <tr>
        <th v-for="(heading, column) in tableHeadings" v-bind:key="column">{{ heading }}</th>
      </tr>
      <tr v-for="(holding, index) in holdings" v-bind:key="index">
        <td>
          <label
            v-if="
							modeEditConfirm ||
								(modeAddConfirm == 'Confirm' && index != holdings.length - 1)
						"
          >
            <router-link
              :to="{ name: 'research', params: { symbolId: holding.symbol } }"
            >{{ holding.symbol }}</router-link>
          </label>
          <label v-else-if="modeAddConfirm == 'Confirm' && !symbolToAdd">
            <auto-complete
              :showButton="false"
              :showLabel="false"
              :symbolId="holding.symbol"
              v-on:symbolentered="symbolEntered"
            />
          </label>
          <label v-else-if="modeAddConfirm == 'Confirm' && symbolToAdd">{{ holding.symbol }}</label>
        </td>
        <td>
          <label
            v-if="
							modeEditConfirm == 'Edit' ||
								(modeAddConfirm == 'Confirm' && index != holdings.length - 1)
						"
          >{{ holding.shares }}</label>
          <label
            v-else-if="
							modeEditConfirm == 'Confirm' ||
								(modeAddConfirm == 'Confirm' && index == holdings.length - 1)
						"
          >
            <input v-model.number="holding.shares" />
          </label>
        </td>
        <td>
          <label
            v-if="
							modeEditConfirm == 'Edit' ||
								(modeAddConfirm == 'Confirm' && index != holdings.length - 1)
						"
          >{{ holding.cost.toFixed(2) }}</label>
          <label
            v-else-if="
							modeEditConfirm == 'Confirm' ||
								(modeAddConfirm == 'Confirm' && index == holdings.length - 1)
						"
          >
            <input v-model.number="holding.cost" />
          </label>
        </td>
        <td>
          <div>{{ (holding.shares * holding.cost).toFixed(2) }}</div>
        </td>
        <td>
          <div v-if="companiesPriceList">
            <label v-for="(marketPrice, index2) in companiesPriceList" v-bind:key="index2">
              <label v-if="marketPrice.symbol == holding.symbol">
                {{
                marketPrice.price
                }}
              </label>
            </label>
          </div>
        </td>
        <td>
          <div v-if="companiesPriceList">
            <label v-for="(marketPrice, index3) in companiesPriceList" v-bind:key="index3">
              <label v-if="marketPrice.symbol == holding.symbol">
                {{
                (holding.shares * marketPrice.price).toFixed(2)
                }}
              </label>
            </label>
          </div>
        </td>
        <td>
          <div v-if="companiesPriceList">
            <label v-for="(marketPrice, index4) in companiesPriceList" v-bind:key="index4">
              <label v-if="marketPrice.symbol == holding.symbol">
                {{
                (
                holding.shares * marketPrice.price -
                holding.shares * holding.cost
                ).toFixed(2)
                }}
              </label>
            </label>
          </div>
        </td>
        <td>
          <button
            v-if="modeAddConfirm == 'Confirm' && index == holdings.length - 1"
            v-on:click="deleteCancelPressed(holding.symbol)"
          >Cancel</button>
          <button
            v-else-if="modeAddConfirm == 'Add'"
            v-on:click="deleteCancelPressed(holding.symbol)"
          >Delete</button>
        </td>
      </tr>
    </table>

    <button v-if="modeAddConfirm" v-on:click="addConfirmPressed">{{ modeAddConfirm }}</button>
    <transition name="fade">
      <div :class="alertType" v-if="alert">{{ alertMessage }}</div>
    </transition>
  </div>
</template>

<script>
import * as app from "./../../app.js";
import AutoComplete from "./../AutoComplete.vue";

export default {
  name: "Portfolio-Page",
  components: { "auto-complete": AutoComplete },
  props: ["symbolToAdd"],
  data: function() {
    return {
      Portfolio: null,
      holdings: [],
      symbolsList: "",
      companiesPriceList: null,
      totalValue: null,
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
      sharedState: app.store,
      alertType: "",
      alert: false,
      alertMessage: ""
    };
  },

  methods: {
    symbolEntered: function(symbol) {
      this.holdings[this.holdings.length - 1].symbol = symbol;
    },
    editConfirmPressed: function() {
      if (this.modeEditConfirm == "Confirm") {
        this.updateToPortfolio(this.holdings);
        this.modeEditConfirm = "Edit";
        this.modeAddConfirm = "Add";
        this.getMarketPrice();
      } else {
        this.modeEditConfirm = "Confirm";
        this.modeAddConfirm = null;
      }
    },
    addConfirmPressed: function() {
      let hl = this.holdings.length;
      if (this.modeAddConfirm == "Confirm") {
        if (this.holdings[hl - 1].symbol == "") {
          this.alert = true;
          this.alertType = "alertbad";
          this.alertMessage =
            "You must choose a symbol from the drop down with either the Enter key or a mouse click";
          setTimeout(() => (this.alert = false), 2500);
        } else if (this.holdings[hl - 1].shares == 0) {
          this.alert = true;
          this.alertType = "alertbad";
          this.alertMessage = "You must choose a number of shares";
          setTimeout(() => (this.alert = false), 2500);
        } else {
          this.addToPortfolio(
            this.holdings[hl - 1].symbol,
            this.holdings[hl - 1].shares,
            this.holdings[hl - 1].cost
          );
          this.modeAddConfirm = "Add";
          this.modeEditConfirm = "Edit";
          this.$router.push({ name: "portfolio" });
        }
      } else {
        this.holdings[hl] = {
          symbol: "",
          shares: 0,
          cost: 0
        };
        if (this.symbolToAdd) {
          this.holdings[hl].symbol = this.symbolToAdd;
        }
        this.modeAddConfirm = "Confirm";
        this.modeEditConfirm = null;

        this.alert = true;
        this.alertType = "alertinfo";
        this.alertMessage =
          "Choose symbol, enter shares & cost/share. To skip, press Cancel. To add to Portfolio, press Confirm";
        setTimeout(() => (this.alert = false), 10000);
      }
    },
    deleteCancelPressed: function(symbol) {
      if (symbol == "" || this.symbolToAdd) {
        this.holdings.splice(this.holdings.length - 1, 1);
      } else {
        this.removeFromPortfolio(symbol);
      }
      this.modeAddConfirm = "Add";

      if (this.holdings.length > 0) {
        this.modeEditConfirm = "Edit";
      }
      this.$router.push({ name: "portfolio" });
    },
    updateToPortfolio: function(holdings) {
      this.Portfolio.update(holdings);
      this.holdings = this.Portfolio.getHoldings();
      this.getMarketPrice();

      this.alert = true;
      this.alertType = "alertgood";
      this.alertMessage = "Your portfolio is up to date as reflected above";
      setTimeout(() => (this.alert = false), 1500);
    },
    addToPortfolio: function(symbol, shares, price) {
      this.Portfolio.add(symbol, shares, price);
      this.holdings = null;
      this.holdings = this.Portfolio.getHoldings();

      this.getMarketPrice();

      this.alert = true;
      this.alertType = "alertgood";
      this.alertMessage = symbol + " has been added to your Portfolio";

      setTimeout(() => (this.alert = false), 1500);
    },
    removeFromPortfolio: function(symbol) {
      this.Portfolio.remove(symbol);

      this.holdings = this.Portfolio.getHoldings();
      this.getMarketPrice();

      this.alert = true;
      this.alertType = "alertgood";
      this.alertMessage = symbol + " has been removed from your Portfolio";
      setTimeout(() => (this.alert = false), 1500);
    },

    updateSymbolsList: function() {
      this.symbolsList = "";
      this.holdings = this.Portfolio.getHoldings();
      this.holdings.forEach(element => {
        if (this.symbolsList == "") {
          this.symbolsList = element.symbol;
        } else {
          this.symbolsList = this.symbolsList + "," + element.symbol;
        }
      });
    },
    getMarketPrice: function() {
      this.companiesPriceList = null;
      this.updateSymbolsList();

      window.console.log(
        "uncaught exception happens after this within axios about bad character in data returned from the API ... " +
          app.config.companiesPriceListUrl +
          this.symbolsList
      );
      app.axios
        .get(app.config.companiesPriceListUrl + this.symbolsList)
        .then(response => {
          window.console.log("... and before this response is received");

          this.totalValue = 0;
          if (this.holdings.length > 1) {
            this.companiesPriceList = response.data.companiesPriceList;

            this.holdings.forEach(holding => {
              for (let p = 0; p < this.companiesPriceList.length; p++) {
                if (holding.symbol == this.companiesPriceList[p].symbol) {
                  this.totalValue +=
                    holding.shares * this.companiesPriceList[p].price;
                }
              }
            });
          } else {
            this.companiesPriceList = response;

            this.totalValue +=
              this.holdings[0].shares * this.companiesPriceList[0].price;
          }
        }),
        error => {
          window.console.error(error);
        };
    },
    format: function(num, digits) {
      var si = [
        { value: 1, char: "" },
        { value: 1e3, char: "K" },
        { value: 1e6, char: "M" },
        { value: 1e9, char: "B" },
        { value: 1e12, char: "T" },
        { value: 1e15, char: "P" },
        { value: 1e18, char: "E" }
      ];
      var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
      var i;
      for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
          break;
        }
      }
      return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].char;
    }
  },
  mounted() {
    this.Portfolio = new app.Portfolio();

    this.holdings = this.Portfolio.getHoldings();

    if (this.holdings.length > 0) {
      this.getMarketPrice();
    }

    if (this.holdings.length == 0) {
      this.alert = true;
      this.alertType = "alertinfo";
      this.alertMessage = "Click Add to portfolio to begin";
      this.modeEditConfirm = null;
      setTimeout(() => (this.alert = false), 5000);
    }

    if (this.symbolToAdd) {
      this.addConfirmPressed();
    }
  }
};
</script>
