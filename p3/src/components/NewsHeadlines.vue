<template>
  <div id="newsheadlines" class="newspage">
    <div class="title">
      <p>News Headlines</p>
    </div>
    <div class="layout" v-for="(article, index) in articles" v-bind:key="index">
      <div class="article">
        <div>
          <a v-bind:href="article.url" class="link">{{ article.title }}</a>
        </div>
        <label class="articleinfo">
          {{ article.source.name }} &middot;
          {{ timeSince(new Date(article.publishedAt)) }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import * as app from "./../app.js";
export default {
  name: "newsheadlines",
  data: function() {
    return {
      articles: null
    };
  },
  methods: {
    timeSince: function(date) {
      var seconds = Math.floor((new Date() - date) / 1000);
      var interval = Math.floor(seconds / 31536000);
      interval = Math.floor(seconds / 86400);
      if (interval > 1) {
        return interval + " days ago";
      }
      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
        return interval + " hours ago";
      }
      interval = Math.floor(seconds / 60);
      if (interval > 1) {
        return interval + " minutes ago";
      }
      return Math.floor(seconds) + " seconds ago";
    }
  },
  mounted() {
    app.axios.get(app.config.newsHeadlinesURL).then(response => {
      this.articles = response.data.articles;
    }),
      error => {
        window.console.error(error);
      };
  }
};
</script>

<style scoped>
.newspage {
  max-width: 60vw;
}
.title {
  text-align: center;
  font-weight: bold;
  font-size: larger;
}
.spacedrows {
  padding-top: 0.5em;
  padding-bottom: 0.5em;
}
.layout {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
}
.article {
  max-width: 60vw;
  color: black;
  margin: 5px;
  padding: 10px;
  border: 1px solid lightgrey;
  border-radius: 15px;
  position: relative;
  float: left;
}
.article:hover {
  background-color: whitesmoke;
}
.link {
  color: black;
  text-decoration: none;
}
.link:hover {
  text-decoration: underline;
}
.articleinfo {
  font-size: smaller;
  color: dimgray;
}
</style>
