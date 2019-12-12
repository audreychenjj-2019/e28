<template>
    <div class="container">
        <table width="100%">
            <tr v-if="user.loggedIn == true">
                <div>
                    <span class="display-name-span">{{
                        user.profile.displayName
                    }}</span
                    >, you are logged in!
                </div>
                <br />

                <div v-if="user.holdings.length > 0">
                    <span class="display-name-span">{{
                        user.profile.displayName
                    }}</span
                    >'s holdings include
                    <ul>
                        <li
                            v-for="(holding, index) in user.holdings"
                            :key="index"
                        >
                            {{ holding.symbol }}
                        </li>
                    </ul>
                </div>

                <div>
                    <button @click="signOut">Sign out</button>
                </div>
            </tr>
            <tr v-else>
                <td class="account-tabel-td">
                    <login-page />
                </td>
                <td>OR</td>
                <td class="account-tabel-td">
                    <register-page />
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import LoginVue from "@/components/Login.vue";
    import Register from "@/components/Register.vue";
    import firebase from "firebase";
    import store from "@/store";

    export default {
        components: {
            "login-page": LoginVue,
            "register-page": Register
        },

        computed: {
            // map `this.user` to `this.$store.getters.user`
            ...mapGetters({
                user: "user"
            })
        },
        methods: {
            signOut() {
                firebase
                    .database()
                    .ref("portfolios/" + store.state.user.uid)
                    .set({
                        holdings: store.state.user.holdings
                    });
                store.dispatch("clearUserData", this.user);
                firebase
                    .auth()
                    .signOut()
                    .then(() => {});
            }
        }
    };
</script>

<style style scoped>
    .account-table-td {
        vertical-align: top;
    }

    .display-name-span {
        text-transform: capitalize;
        font-weight: bold;
        font-size: larger;
        text-align: center;
    }
</style>
