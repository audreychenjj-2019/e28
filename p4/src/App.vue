<template>
    <div id="app">
        <img id="logo" alt="MarketDash logo" class="imgSize" src="./assets/images/stock.png" />
        <div id="nav" class="navigation-bar">
            <span v-for="(link, index) in links" :key="index">
                <router-link class="navigation-link" exact :to="{ name: link }">
                    {{ link }}
                </router-link>
                <span v-if="index < links.length - 1">|</span>
            </span>
        </div>
        <router-view />
    </div>
</template>

<script>
    export default {
        name: "app",
        components: {},
        data: function() {
            return {
                links: ["today", "research", "portfolio", "account"]
            };
        }
    };
</script>

<style>
    #app {
        width: 100%;
        margin: auto;
        padding-bottom: 20px;
        text-align: center;
    }

    .imgSize {
        max-height: 40px;
    }

    .navigation-bar {
        padding: 30px;
        font-size: larger;
    }

    .navigation-link {
        text-transform: capitalize;
        padding: 5px;
        margin: 5px;
        cursor: pointer;
        font-weight: bold;
        color: #2c3e50;
    }

    .navigation-link:link,
    .navigation-link:visited,
    .navigation-link:active,
    .navigation-link:hover {
        color: #0074d9;
    }

    .navigation-link:hover {
        background-color: #0074d9;
        color: white;
        text-decoration: none;
    }

    a.router-link-active:link,
    a.router-link-active:visited,
    a.router-link-active:active,
    a.router-link-active:hover {
        text-decoration: none;
        color: black;
        background-color: white;
        cursor: inherit;
    }
</style>
