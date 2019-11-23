import { expect } from "chai";
import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import ShowProduct from "@/components/ShowProduct.vue";

//when shallow mounting, need to provide stub of child components that the component being tested imports
// to check if the router link itself is and showing up on a page, we can look for elements in the dom, give the element a class and access it from here
// however, instead of using class name, create a custom attribute for the element.

describe("ShowProduct.vue", () => {
	it("shows a product", () => {
		// const msg = "new message";

		let product = {
			id: 1,
			name: "Driscoll’s Strawberries",
			description:
				"Driscoll’s Strawberries are consistently the best, sweetest, juiciest strawberries available. This size is the best selling, as it is both convenient for completing a cherished family recipes and for preparing a quick snack straight from the fridge.",
			price: 4.99,
			available: 0,
			weight: 1,
			perishable: true,
			categories: ["produce", "fruits"]
		};

		const wrapper = shallowMount(ShowProduct, {
			propsData: { product },
			stubs: {
				RouterLink: RouterLinkStub
			}
		});
		expect(wrapper.text()).to.include(product.name);

		expect(wrapper.find(".product-link").exists()).to.equal(true);

		// or you can write the same as -
		let foundProductLink = wrapper.find(".product-link").exists();
		expect(foundProductLink).to.equal(true);

		// to select by custom attribute use the square brackets
		let foundProductLinkCustomAttribute = wrapper
			.find("[data-test='product-link']")
			.exists();
		expect(foundProductLinkCustomAttribute).to.equal(true);
	});
});
