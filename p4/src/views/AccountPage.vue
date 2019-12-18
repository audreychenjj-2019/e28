<template>
    <div class="container">
        <table width="100%">
            <tr v-if="user.loggedIn == true">
                <div>
                    <span class="display-name-span"> {{ user.profile.displayName }} </span>you are logged in!
                </div>
                <br />

                <div v-if="user.holdings.length > 0">
                    Your holdings include
                    <ul>
                        <li v-for="(holding, index) in user.holdings" :key="index">{{ holding.symbol }}</li>
                    </ul>
                </div>
                <div v-else>You currently have 0 holdings. Get started, browse around, get comfy.</div>
                <div>
                    <button data-test="button-delete-account" @click="deleteAccount">Delete My Account</button>
                </div>
                <transition name="fade">
                    <div :class="alertType" v-if="showAlert">{{ alertMessage }}</div>
                </transition>
                <div>
                    <button data-test="button-signout" @click="signOut">Sign out</button>
                </div>
            </tr>
            <tr v-else>
                <td class="account-table-td">
                    <signin-page />
                </td>
                <td>OR</td>
                <td class="account-table-td">
                    <signup-page />
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    import SignIn from "@/components/SignIn.vue";
    import SignUp from "@/components/SignUp.vue";
    import firebase from "firebase";

    export default {
        components: {
            "signin-page": SignIn,
            "signup-page": SignUp
        },

        computed: {
            user: function() {
                return this.$store.state.user;
            }
        },
        data: function() {
            return {
                alertType: "",
                showAlert: false,
                alertMessage: ""
            };
        },
        methods: {
            signOut() {
                this.user.db.ref("portfolios/" + this.user.uid).set({
                    holdings: this.user.holdings
                });

                firebase
                    .auth()
                    .signOut()
                    .then(() => {
                        this.$store.dispatch("clearUserData", this.user);
                    });
            },

            deleteAccount() {
                this.user.db.ref("portfolios/" + this.user.uid).remove();

                var firebaseUser = firebase.auth().currentUser;

                firebaseUser
                    .delete()
                    .then(function() {
                        this.$store.dispatch("clearUserData", this.user);
                    })
                    .catch(function(error) {
                        window.console.log(error);
                    });
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
