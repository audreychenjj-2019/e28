<template>
	<div id="app">
		<img
			id="logo"
			alt="Zipfoods logo"
			src="./assets/images/zipfoods-logo.png"
		/>

		<nav>
			<ul>
				<li v-for="link in links" :key="link">
					<router-link exact :to="{ name: link }">
						{{ link }}
						<span data-test="cart-count" v-if="link == 'cart'"
							>({{ cartCount }})</span
						>
					</router-link>
				</li>
			</ul>
		</nav>
		<!-- <nav>
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
		</nav>-->

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
	import * as app from "./app.js";

	export default {
		name: "app",
		// components: { ShowProducts, ShowHome, ShowCategories },
		data: function() {
			return {
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
				// src/App.vue data properties
				links: ["home", "products", "categories", "cart"]
				// sharedState: app.store
				// paths: {
				//   home: "/",
				//   products: "/products",
				//   categories: "/categories"
				// }
			};
		},
		computed: {
			cartCount: function() {
				return this.$store.state.cartCount;
			}
		},
		mounted() {
			// // Store a key/value pair
			localStorage.setItem("name", "Bob");

			// // Retrieve (by key)
			window.console.log(localStorage.getItem("name"));

			// // Remove (by key) key/value pair
			localStorage.removeItem("name");

			window.console.log(localStorage.getItem("name"));

			let userObj = {
				firstName: "Jamal",
				lastName: "Jones",
				email: "jjones@gmail.com"
			};

			localStorage.setItem("user", JSON.stringify(userObj));

			userObj = JSON.parse(localStorage.getItem("user"));

			window.console.log(
				userObj.firstName + " " + userObj.lastName + " " + userObj.email
			);
			window.console.log(localStorage.getItem("user"));

			localStorage.removeItem("user");

			window.console.log(JSON.parse(localStorage.getItem("user")));

			// app.store.cart = new app.Cart();
			// app.store.cartCount = app.store.cart.count();

			window.console.log(this.$store);
			window.console.log(this.$store.state.cartCount);
			window.console.log(this.cartCount);

			this.cart = new app.Cart();
			this.$store.commit("setCartCount", this.cart.count()); // initialize value from local storage so that every time the page is reloaded the data is not lost

			this.$store.dispatch("setProducts");
		}
	};
</script>

<style lang="scss">
	@import "./assets/css/zipfoods.scss";
</style>
