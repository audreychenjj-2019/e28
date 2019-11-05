<template>
  <div id="app">
    <img id="logo" alt="Zipfoods logo" src="./assets/images/zipfoods-logo.png" />

    <nav>
      <ul>
        <li>
          <router-link to="/" exact>Home</router-link>
        </li>
        <li>
          <router-link to="/products">Products</router-link>
        </li>
        <li>
          <router-link to="/categories">Categories</router-link>
        </li>
      </ul>
    </nav>

    <router-view></router-view>

    <!-- <nav>
      <ul>
        <li v-for="link in links" :key="link">
          <a href="#" @click="page = link">{{ link }}</a>
        </li>
      </ul>
    </nav>

    <component :is="linkComponents[page]"></component>-->
  </div>
</template>

<script>
import { products } from "./products.js";

export default {
  name: "app",
  // components: { ShowProducts, ShowHome, ShowCategories },
  data: function() {
    return {
      products: products
      // /* Default page to start with */
      // page: "home",
      // /* Store links in an array to maintain order */
      // links: ["home", "products", "categories"],
      // linkComponents:
      // {
      //   home: "ShowHome",
      //   products: "ShowProducts",
      //   categories: "ShowCategories"
      // }
    };
  }
};
</script>

<style lang='scss'>
@import "./assets/css/zipfoods.scss";
</style>