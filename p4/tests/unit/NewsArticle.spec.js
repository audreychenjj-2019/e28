import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import NewsArticle from "@/components/NewsArticle.vue";
import GlobalFunctions from "@/mixins/GlobalFunctions.js";

describe("NewsArticle.vue", () => {
    const article = {
        source: {
            id: "the-verge",
            name: "The Verge"
        },
        author: "Andrew J. Hawkins",
        title: "An all-electric seaplane took flight in Canada for the first time - The Verge",
        description:
            "The plane, operated by Harbour Air and MagniX, is a yellow-and-black six-seater de Havilland DHC-2 Beaver with a 750-horsepower Magni500 propulsion system. The short test flight took place on the Fraser River at Harbour Air Seaplanes terminal in Richmond, nea…",
        url: "https://www.theverge.com/2019/12/12/21012891/electric-airplane-first-flight-magnix-harbor-air",
        urlToImage:
            "https://cdn.vox-cdn.com/thumbor/40Ta5vDqubucnG1GtkiB4Q4izkc=/0x138:1920x1143/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/19486715/ePlaneFirstFlight3_12.10.19__1_.jpg",
        publishedAt: "2019-12-12T18:09:42Z",
        content:
            "The plane, operated by Harbour Air and MagniX, is a yellow-and-black six-seater with a 750-horsepower Magni500 propulsion system\r\nMost electric-powered aircraft being tested today look like mutant helicopters or drones on steroids. So it was with some relief … [+2545 chars]"
    };

    it("Displays an article headline", () => {
        const wrapper = shallowMount(NewsArticle, {
            propsData: { article },
            mixins: [GlobalFunctions]
        });
        expect(wrapper.text()).to.include(article.title.substring(0, article.title.indexOf(" - ")));
        expect(wrapper.find('[data-test="article-link"]').exists()).to.equal(true);
    });
});
