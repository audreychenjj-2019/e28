<template>
    <div class="today">
        <div class="floating-layout">
            <div class="one-floater">
                <index-sector />
            </div>
            <div class="one-floater top-quotes-unsquished">
                <top-quotes />
            </div>
            <div class="one-floater news-box">
                <news-headlines />
            </div>
        </div>
        <div align="left">Sources: FinancialModelingPrep, NewsAPI</div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import IndexSector from "@/components/IndexSector.vue";
    import TopQuotes from "@/components/TopQuotes.vue";
    import NewsHeadlines from "@/components/NewsHeadlines.vue";

    export default {
        name: "today",
        components: {
            "index-sector": IndexSector,
            "top-quotes": TopQuotes,
            "news-headlines": NewsHeadlines
        }
    };
</script>

<style scoped>
    .today {
        width: 100%;
    }

    .floating-layout {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: left;
        float: left;
    }

    .one-floater {
        position: relative;
        float: left;
        vertical-align: top;
        padding: 20px;
    }

    .top-quotes-unsquished {
        min-width: 15%;
    }

    .news-box {
        max-width: 60%;
    }
</style>
