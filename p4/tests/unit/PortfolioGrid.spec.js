import { expect } from "chai";
import { mount, RouterLinkStub } from "@vue/test-utils";
import PortfolioRow from "@/components/PortfolioRow.vue";

describe("PortfolioRow.vue", () => {
    let holdingsRow = { cost: 100, shares: 100, symbol: "MSFT" };
    const portfolioRow = {
        symbol: "MSFT",
        shares: 100,
        cost: "100.00",
        totalCost: "10000.00",
        marketPrice: 153.07,
        marketValue: 15307,
        profit: 5307
    };

    it("Displays a portfolio row for a holding along with market data and an edit button", () => {
        const wrapper = mount(PortfolioRow, {
            propsData: { holdingsRow, portfolioRow },
            computed: {
                portfolioEditStatus: function() {
                    return "MSFT";
                }
            },
            stubs: {
                RouterLink: RouterLinkStub
            }
        });
        expect(wrapper.text()).to.include("15307");
        expect(wrapper.find('[data-test="button-edit"]').exists()).to.equal(true);
    });
});
