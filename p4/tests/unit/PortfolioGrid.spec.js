import Vue from 'vue';
import { expect } from 'chai'
// import { mount } from '@vue/test-utils'
import PortfolioGrid from '@/components/PortfolioGrid.vue'
import GlobalFunctions from "@/mixins/GlobalFunctions.js";

describe('PortfolioGrid.vue', () =>
{
    const holdings = [{ "cost": 100, "shares": 100, "symbol": "MSFT" }]
    // const companiesPriceList = [{ "symbol": "MSFT", "price": 153.07 }]
    // let portfolioRow = { "symbol": "MSFT", "shares": 100, "cost": "100.00", "totalCost": "10000.00", "marketPrice": 153.07, "marketValue": 15307, "profit": 5307 }

    it('Shows holdings costs in Portfolio', () =>
    {
        const Constructor = Vue.extend(PortfolioGrid);

        const comp = new Constructor({
            propsData: { holdings },
            mixins: [GlobalFunctions]
        }).$mount();

        // const wrapper = shallowMount(PortfolioGrid, {
        //     propsData: { holdings },
        //     mixins: [GlobalFunctions],
        //     // Mock axios with computed property
        //     data: function ()
        //     {
        //         return {
        //             companiesPriceList: function ()
        //             {
        //                 return companiesPriceList
        //             },
        //             // portfolioRows: function ()
        //             // {
        //             //     return [portfolioRow]
        //             // },
        //         }
        //     }
        // })

        Vue.nextTick(() =>
        {
            expect(comp.$el.totalValue)
                .to.equal(10000.00);
            // Since we're doing this asynchronously, we need to call done() to tell Mocha that we've finished the test.
        });

        // expect(comp.$PortfolioGrid.totalValue).to.equal(10000.00)

    })
})
