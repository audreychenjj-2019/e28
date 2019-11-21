<template>
  <div id="app">
    <img id="logo" alt="Stock app logo" class="imgSize" src="./assets/images/marketdash-logo.png" />
    <nav>
      <ul>
        <li v-for="link in links" :key="link">
          <router-link v-if="link != 'research'" exact :to="{ name: link }">
            {{
            link
            }}
          </router-link>
          <router-link v-else-if="link == 'research'" :to="{ name: link }">
            {{
            link
            }}
          </router-link>
        </li>
      </ul>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script>
import * as app from "./app.js";

export default {
  name: "app",
  components: {},
  data: function() {
    return {
      links: ["today", "research", "portfolio"],
      symbolsList: null
    };
  },
  mounted() {
    app.axios.get(app.config.stockListUrl).then(response => {
      app.store.symbolsList = response.data.symbolsList;
      app.store.symbolsList.sort((a, b) =>
        a.symbol.length > b.symbol.length
          ? 1
          : a.symbol.length === b.symbol.length
          ? a.symbol > b.symbol
            ? 1
            : -1
          : -1
      );
    }),
      error => {
        window.console.error(error);
      };
  }
};
</script>

<style lang="scss">
@import "./assets/css/stocks.scss";

.imgSize {
  max-height: 30px;
  //   float: right;
}
</style>
