<template>
  <div id="show-research">
    <h1></h1>
    <div v-if="symbol && symbol!=''">
      <show-profile :symbolId="symbol"></show-profile>
      <show-metrics :symbolId="symbol"></show-metrics>
    </div>
  </div>
</template>

<script>
import * as app from "./../app.js";
import ShowProfile from "./ShowProfile.vue";
import ShowMetrics from "./ShowMetrics.vue";

export default {
  name: "ShowResearch",
  props: ["symbolId"],
  components: {
    "show-profile": ShowProfile,
    "show-metrics": ShowMetrics
  },
  data: function() {
    return {
      symbol: "",
      sharedState: app.store
    };
  },
  methods: {},
  mounted() {
    this.symbol = this.symbolId;
  }
};
</script>

