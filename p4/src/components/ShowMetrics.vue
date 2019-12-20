<template>
    <div id="showmetrics-wrapper" class="showmetrics-wrapper">
        <table v-if="companyKeyMetrics" class="keyMetrics showmetrics-wrapper-table">
            <tr>
                <td>
                    <div class="showmetrics-scroll">
                        <tr>
                            <th>Metric</th>
                            <th>Latest</th>
                        </tr>
                        <tr v-for="(value, key) in companyKeyMetrics[0]" v-bind:key="key">
                            <td v-if="key != 'date'">{{ key }}</td>
                            <td v-if="key != 'date'">
                                {{ format(value, 2) }}
                                <button v-on:click="trend(key)" class="trend">Trend</button>
                            </td>
                        </tr>
                    </div>
                </td>
                <td v-if="chartData" style="position: relative; vertical-align:top; horizontal-align:center;">
                    Last 10 years - {{ metricName }}
                    <line-chart :chart-data="chartData" :options="chartOptions" />
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    import LineChart from "@/components/LineChart.vue";

    export default {
        name: "showmetrics",
        components: {
            "line-chart": LineChart
        },
        props: ["companyKeyMetrics"],
        data: function() {
            return {
                // companyKeyMetrics: null,
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
            }
        }
    };
</script>

<style scoped>
    .showmetrics-wrapper {
        position: relative;
    }

    .showmetrics-scroll {
        height: 400px;
        overflow: auto;
    }

    .showmetrics-wrapper-table {
        width: 100%;
    }

    .keyMetrics {
        position: relative;
        margin: auto;
        width: 80%;
        border: 3px solid #0074d9;
        text-align: left;
        padding: 20px;
        height: 500px;
        overflow: auto;
    }
    .trend {
        margin: 10px;
    }
</style>
