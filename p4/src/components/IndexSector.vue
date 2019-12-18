<template>
    <div id="IndexSector" class="index-sector">
        <quotes-box
            v-if="majorIndexesList"
            :topList="majorIndexesList"
            :title="'Top US Indexes'"
            :topX="3"
            :isIndex="true"
        />

        <sector-quotes-box
            v-if="sectorPerformanceList"
            :sectorList="sectorPerformanceList"
            :title="'Sector-Wise Performance'"
        />
    </div>
</template>

<script>
    import * as app from "@/app.js";
    import QuotesBox from "@/components/QuotesBox.vue";
    import SectorQuotesBox from "@/components/SectorQuotesBox.vue";

    export default {
        name: "IndexSector",
        components: {
            "quotes-box": QuotesBox,
            "sector-quotes-box": SectorQuotesBox
        },
        data: function() {
            return {
                majorIndexesList: null,
                sectorPerformanceList: null
            };
        },
        mounted() {
            app.axios.get(app.config.majorIndexesUrl).then(response => {
                this.majorIndexesList = response.data[Object.keys(response.data)[0]];
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
</style>
