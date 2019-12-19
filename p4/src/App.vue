<template>
    <div id="app">
        <img id="logo" alt="MarketDash logo" src="./assets/images/stock.png" />

        <nav>
            <ul>
                <li class="navigation-link" v-for="(link, index) in links" :key="index">
                    <router-link exact :to="{ name: link }">
                        {{ link }}
                    </router-link>
                    <span v-if="index < links.length - 1">|</span>
                </li>
            </ul>
        </nav>

        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "app",
        data: function() {
            return {
                links: ["today", "research", "portfolio", "account"]
            };
        }
    };
</script>

<style scoped lang="scss">
    $blue: #0074d9;
    $navy: #001f3f;
    $white: #ffffff;

    #app {
        width: 100%;
        margin: auto;
        padding-bottom: 200px;
        text-align: center;
    }

    #logo {
        max-height: 40px;
    }

    .navigation-link {
        font-size: larger;
    }

    nav ul {
        list-style-type: none;

        li {
            display: inline-block;

            a:link,
            a:visited,
            a:active,
            a:hover {
                text-transform: capitalize;
                padding: 5px;
                margin: 5px;
                cursor: pointer;
                text-decoration: none;
                color: $blue;
                background-color: $white;
                font-weight: bold;
                text-align: center;
            }

            a:hover {
                text-decoration: none;
                color: $white;
                background-color: $blue;
                font-weight: bold;
            }

            a.router-link-active:link,
            a.router-link-active:visited,
            a.router-link-active:active,
            a.router-link-active:hover {
                text-decoration: none;
                color: $white;
                background-color: $blue;
                cursor: inherit;
                font-weight: bold;
            }
        }
    }
</style>
