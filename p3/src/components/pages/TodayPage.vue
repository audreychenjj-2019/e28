<template>
  <div id="today-page" v-bind:class="'todaypage'">
    <div class="Table">
      <div class="Title"></div>
      <div class="Row">
        <div class="Cell">
          <top-quotes
            v-if="majorIndexesList"
            :stockList="majorIndexesList"
            :topX="3"
            :isIndex="true"
            :title="'Top US Indexes'"
          />
          <div class="Table" v-if="sectorPerformanceList">
            <div class="Title">
              <p>Sector-Wise Performance</p>
            </div>
            <div class="Row" v-for="(sector, index) in sectorPerformanceList" v-bind:key="index">
              <div class="Cell">
                <p
                  v-bind:class="[
										'characters',
										parseFloat(sector.changesPercentage) < 0
											? 'increasetext'
											: 'decreasetext'
									]"
                >{{ sector.sector }}</p>
              </div>
              <div class="Cell">
                <p
                  v-bind:class="[
										parseFloat(sector.changesPercentage) < 0
											? 'positive'
											: 'negative',
										'numbers'
									]"
                >{{ parseFloat(sector.changesPercentage).toFixed(2) }}%</p>
              </div>
            </div>
          </div>
        </div>
        <div class="Cell">
          <top-quotes
            v-if="mostGainerStockList"
            :stockList="mostGainerStockList"
            :topX="5"
            :isIndex="false"
            :title="'Top Gainers'"
          />

          <top-quotes
            v-if="mostLoserStockList"
            :stockList="mostLoserStockList"
            :topX="5"
            :isIndex="false"
            :title="'Top Losers'"
          />

          <top-quotes
            v-if="mostActiveStockList"
            :stockList="mostActiveStockList"
            :topX="5"
            :isIndex="false"
            :title="'Most Active Trades'"
          />
        </div>
        <div class="Cell" v-bind:class="'layout'">
          <news-headlines />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as app from "./../../app.js";
import TopQuotes from "./../TopQuotes.vue";
import NewsHeadlines from "./../NewsHeadlines.vue";

export default {
  name: "TodayPage",
  components: {
    "top-quotes": TopQuotes,
    "news-headlines": NewsHeadlines
  },
  data: function() {
    return {
      majorIndexesList: null,
      mostActiveStockList: null,
      mostGainerStockList: null,
      mostLoserStockList: null,
      sectorPerformanceList: null
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
    }),
      error => {
        window.console.error(error);
      };
    app.axios.get(app.config.mostActiveStockUrl).then(response => {
      (this.mostActiveStockList = this.sortByProperty(
        response.data.mostActiveStock,
        "changesPercentage"
      )),
        error => {
          window.console.error(error);
        };
    }),
      error => {
        window.console.error(error);
      };
    app.axios.get(app.config.mostGainerStockUrl).then(response => {
      this.mostGainerStockList = this.sortByProperty(
        response.data.mostGainerStock,
        "changesPercentage"
      );
    }),
      error => {
        window.console.error(error);
      };
    app.axios.get(app.config.mostLoserStockUrl).then(response => {
      this.mostLoserStockList = this.sortByProperty(
        response.data.mostLoserStock,
        "changesPercentage"
      ).reverse();
    }),
      error => {
        window.console.error(error);
      };
    app.axios.get(app.config.sectorPerformanceUrl).then(response => {
      this.sectorPerformanceList = response.data.sectorPerformance;
    }),
      error => {
        window.console.error(error);
      };
  }
};
</script>

<style scoped>
.todaypage {
  text-align: initial;
}
.todaytable {
  width: 100%;
}
.td {
  vertical-align: top;
}
.tdnews {
  vertical-align: top;
  width: 60%;
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
.layout {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-around;
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
