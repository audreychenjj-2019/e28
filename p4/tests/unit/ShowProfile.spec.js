import { expect } from "chai";
import { mount, RouterLinkStub } from "@vue/test-utils";
import ShowProfile from "@/components/ShowProfile.vue";
import GlobalFunctions from "@/mixins/GlobalFunctions.js";

describe("ShowProfile.vue", () => {
    const companyProfile = {
        price: 172.21,
        beta: "1.056007",
        volAvg: "2588875",
        mktCap: "101345585000.00",
        lastDiv: "5.76",
        range: "176.87-221.69",
        changes: 0.07,
        changesPercentage: "(+0.04%)",
        companyName: "3M Company",
        exchange: "New York Stock Exchange",
        industry: "Industrial Products",
        website: "http://www.3m.com",
        description:
            "3M Co is a diversified technology company. It manufactures a diverse array of industrial and consumer products. Its business segments are Industrial, Safety and Graphics, Health Care, Electronics and Energy, and Consumer.",
        ceo: "Inge G. Thulin",
        sector: "Industrials",
        image: "https://financialmodelingprep.com/images-New-jpg/MMM.jpg"
    };
    const symbolID = "MMM";
    const indexComponent = "Dow 30";

    it("Displays profile and Dow component data as part of research about a company", () => {
        const wrapper = mount(ShowProfile, {
            propsData: { symbolID, companyProfile, indexComponent },
            stubs: {
                RouterLink: RouterLinkStub
            },
            mixins: [GlobalFunctions]
        });
        expect(wrapper.text()).to.include("3M Company");
        expect(wrapper.text()).to.include("Dow 30");
    });
});
