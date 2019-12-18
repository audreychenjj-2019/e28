<template>
    <div id="show-research">
        <div v-if="symbol && symbol != ''">
            <show-profile :symbolId="symbol"></show-profile>
            <show-metrics :symbolId="symbol"></show-metrics>
        </div>
    </div>
</template>

<script>
    import ShowProfile from "@/components/ShowProfile.vue";
    import ShowMetrics from "@/components/ShowMetrics.vue";

    export default {
        name: "ShowResearch",
        props: ["symbolId"],
        components: {
            "show-profile": ShowProfile,
            "show-metrics": ShowMetrics
        },
        data: function() {
            return {
                symbol: ""
            };
        },
        mounted() {
            this.symbol = this.symbolId;
        }
    };
</script>
