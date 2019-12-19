<template>
    <div id="newsheadlines" class="newspage">
        <div class="title">
            <p>News Headlines</p>
        </div>
        <div class="layout" v-for="(article, index) in articles" v-bind:key="index">
            <news-article :article="article"></news-article>
        </div>
    </div>
</template>

<script>
    import * as app from "@/app.js";
    import NewsArticle from "@/components/NewsArticle.vue";

    export default {
        name: "newsheadlines",
        components: {
            "news-article": NewsArticle
        },
        data: function() {
            return {
                articles: null
            };
        },
        computed: {
            lastFoundArticles: function() {
                return this.$store.state.lastFoundArticles;
            }
        },
        mounted() {
            if (this.lastFoundArticles) {
                this.articles = this.lastFoundArticles;
            }
            app.axios.get(app.config.newsHeadlinesURL).then(response => {
                if (response.data.articles !== this.lastFoundArticles) {
                    this.articles = response.data.articles;
                    this.$store.commit("setLastFoundArticles", this.articles);
                }
            });
        }
    };
</script>

<style scoped>
    .title {
        font-weight: bold;
        font-size: x-large;
    }

    .layout {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: space-around;
        float: left;
    }
</style>
