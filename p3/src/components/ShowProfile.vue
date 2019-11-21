<template>
  <div id="showprofile">
    <h1></h1>
    <table v-if="companyProfile" class="company">
      <tr>
        <td>
          <a v-bind:href="companyProfile.website" target="_blank">
            <img
              class="company-thumb"
              :alt="'Company image of ' + symbolId"
              :src="companyProfile.image"
            />
          </a>
        </td>
        <td>
          <h2>Company profile</h2>
          {{companyProfile.sector}} > {{companyProfile.industry}} >
          <strong>
            <a v-bind:href="companyProfile.website" target="_blank">{{companyProfile.companyName}}</a>
          </strong>
          CEO: {{companyProfile.ceo}}
          <p>
            ({{companyProfile.exchange}}: {{symbolId}})
            <strong>${{companyProfile.price}}</strong>
            MCap: ${{format(companyProfile.mktCap,2)}} Beta: {{format(companyProfile.beta,2)}}
          </p>
          <p>{{companyProfile.description}}</p>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import * as app from "./../app.js";

export default {
  name: "showprofile",
  props: ["symbolId"],
  data: function() {
    return {
      companyProfile: null
    };
  },
  methods: {
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
    app.axios.get(app.config.baseProfileUrl + this.symbolId).then(response => {
      this.companyProfile = response.data.profile;
    }),
      error => {
        window.console.error(error);
      };
  }
};
</script>

<style scoped>
.company {
  position: relative;
  margin: auto;
  width: 80%;
  /* border: 3px solid #0074d9; */
  background-color: whitesmoke;
  padding: 10px;
}
</style>