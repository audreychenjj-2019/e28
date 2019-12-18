<template>
    <div id="SectorQuotesBox">
        <div class="table-of-divs" v-if="sectorList">
            <div class="table-title">
                <p>{{ title }}</p>
            </div>
            <div class="table-row" v-for="(display, index) in displaySectors" v-bind:key="index">
                <div class="table-cell">
                    <p v-bind:class="[display.sectorClass]">
                        {{ display.sector }}
                    </p>
                </div>
                <div class="table-cell">
                    <p v-bind:class="[display.changePercentClass]">{{ display.changesPercent }}%</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SectorQuotesBox",
        props: {
            sectorList: { type: Array, default: () => [] },
            title: { type: String, required: true }
        },
        computed: {
            displaySectors: function() {
                return this.sectorList.map(item => {
                    return Object.assign(
                        {},
                        {
                            sector: item.sector,
                            sectorClass:
                                "characters" +
                                " " +
                                (parseFloat(item.changesPercentage) > 0 ? "increasetext" : "decreasetext"),
                            changesPercent: parseFloat(item.changesPercentage).toFixed(2),
                            changePercentClass:
                                "numbers" + " " + (parseFloat(item.changesPercentage) > 0 ? "positive" : "negative")
                        }
                    );
                });
            }
        }
    };
</script>

<style scoped>
    .table-of-divs {
        display: table;
    }
    .table-title {
        display: table-caption;
        text-align: center;
        font-weight: bold;
        font-size: larger;
    }
    .table-row {
        display: table-row;
    }
    .table-cell {
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
