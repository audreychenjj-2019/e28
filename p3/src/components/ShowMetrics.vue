<template>
  <div id="showmetrics-wrapper">
    <table v-if="companyKeyMetrics" class="keyMetrics">
      <tr>
        <td>
          <div id="showmetrics-scroll">
            <tr>
              <th>Metric</th>
              <th>Latest</th>
            </tr>
            <tr v-for="(value, key) in companyKeyMetrics[0]" v-bind:key="key">
              <td v-if="(key!='date')">{{key}}</td>
              <td v-if="(key!='date')">
                {{format(value,2)}}
                <button v-on:click="trend(key)" class="trend">Trend</button>
              </td>
            </tr>
          </div>
        </td>
        <td
          v-if="chartData"
          style="position: relative; vertical-align:top; horizontal-align:center;"
        >
          Last 10 years - {{metricName}}
          <line-chart :chart-data="chartData" :options="chartOptions" />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import * as app from "./../app.js";
import LineChart from "./LineChart.vue";

export default {
  name: "showmetrics",
  components: {
    "line-chart": LineChart
  },
  props: ["symbolId"],
  data: function() {
    return {
      companyKeyMetrics: null,
      metricName: "",
      year: [],
      metric: [],
      chartData: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        }
      }
    };
  },
  methods: {
    trend: function(metricName) {
      this.metricName = metricName;
      let labels = [];
      let data1 = [];
      let j = 0;
      this.companyKeyMetrics.forEach(element => {
        labels[j] = new Date(element["date"]).getUTCFullYear();
        data1[j] = parseFloat(element[this.metricName]);
        j++;
      });

      let datasets = [];

      datasets.push({
        data: data1.reverse(),
        fill: false,
        backgroundColor: "#f87979"
      });

      this.chartData = Object.assign(
        {},
        {
          labels: labels.reverse(),
          datasets: datasets
        }
      );
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
    app.axios
      .get(app.config.companyKeyMetricsBaseUrl + this.symbolId)
      .then(response => {
        this.companyKeyMetrics = response.data.metrics;
      }),
      error => {
        window.console.error(error);
      };
  }
};
</script>

<style scoped>
.keyMetrics {
  position: relative;
  margin: auto;
  width: 80%;
  border: 3px solid #0074d9;
  text-align: left;
  padding: 20px;
}
.trend {
  margin: 10px;
}
</style>