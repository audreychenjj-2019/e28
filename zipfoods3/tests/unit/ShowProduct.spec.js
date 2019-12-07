// /tests/unit/ShowProduct.spec.js

// Import our assertion library
// https://www.chaijs.com/guide/styles/#expect
import { expect } from 'chai'

// Vue Test Utils tests Vue components by mounting them in isolation, 
// mocking the necessary inputs (props, injections and user events) and 
// asserting the outputs (render result, emitted custom events).
// Here we're using `shallowMount` which will allow us to mount our component 
// without rendering its child components.
// https://vue-test-utils.vuejs.org/api/#shallowmount
// https://vue-test-utils.vuejs.org/api/components/#routerlinkstub
import { shallowMount, RouterLinkStub } from '@vue/test-utils'

// Import the component you want to test
import ShowProduct from '@/components/ShowProduct.vue'

// describe() is how we group tests in Mocha
// It takes two arguments:
// 1) name of the test group
// 2) callback function
describe('ShowProduct.vue', () => {

    // it() is used for an individual test case.
    // should be written as if you were saying it out loud: “It should equal zero”, “It should log the user in”, etc. 
    // takes two arguments:
    // 1) a string explaining what the test should do, 
    // 2) a callback function which contains our actual test
    it('shows a product', () => {

        // Define a product we can test
        let product = {
            slug: 'driscolls-strawberries',
            name: 'Driscoll’s Strawberries',
            description:
                'Driscoll’s Strawberries are consistently the best, sweetest, juiciest strawberries available. This size is the best selling, as it is both convenient for completing a cherished family recipes and for preparing a quick snack straight from the fridge.',
            price: 4.99,
            available: 0,
            weight: 1,
            perishable: true,
            categories: ['produce', 'fruits']
        }

        // Mount our component
        // Mounted components are returned inside a Wrapper, which exposes 
        // many convenience methods for manipulating, traversing and 
        // querying the underlying Vue component instance.
        // https://vue-test-utils.vuejs.org/api/wrapper/#properties
        const wrapper = shallowMount(ShowProduct, {
            propsData: { product },
            stubs: {
                RouterLink: RouterLinkStub
            }
        })

        // Assert our results
        expect(wrapper.text()).to.include(product.name)
        let foundProductLink = wrapper.find('[data-test="product-link"]').exists();
        expect(foundProductLink).to.equal(true);
    })
})
