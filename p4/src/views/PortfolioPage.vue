<template>
    <div id="portfolio-page">
        <router-link :to="{ name: 'account' }" class="button-save-to-portfolio">
            <button data-test="button-save-to-account" :disabled="holdingsLength == 0">Save To My Account</button>
        </router-link>
        <show-portfolio :symbolToAdd="symbolToAdd" />
    </div>
</template>
<script>
    import ShowPortfolio from "@/components/ShowPortfolio.vue";

    export default {
        name: "Portfolio-Page",
        components: {
            "show-portfolio": ShowPortfolio
        },
        props: { symbolToAdd: { type: String, required: false, default: "" } },
        computed: {
            holdingsLength: function() {
                let holdings = this.$store.state.user.holdings;
                return holdings ? holdings.length : 0;
            }
        }
    };
</script>

<style scoped>
    .portfolio-page {
        width: 100%;
    }

    .button-save-to-portfolio {
        text-decoration: none;
    }
</style>
