<template>
    <div id="SignedInDashboard">
        <h1>
            <span v-if="user.profile.displayName != null">{{ user.profile.displayName }}'s</span> Account Dashboard
        </h1>
        <div class="error-message" v-if="error">{{ error }}</div>
        <div>You are logged in!</div>
        <div v-if="user.holdings.length > 0">
            Your holdings include -
            <ul>
                <li v-for="(holding, index) in user.holdings" :key="index">{{ holding.symbol }}</li>
            </ul>
            <div>
                <button @click="saveHoldingsToAccount">Save Holdings To My Account</button>
            </div>
        </div>
        <div v-else>You currently have 0 holdings. Get started, browse around, get comfy.</div>

        <div>
            <button data-test="button-delete-account" @click="deleteAccount">Delete My Account</button>
        </div>
        <div>
            <button data-test="button-signout" @click="signOut">Sign out</button>
        </div>
    </div>
</template>

<script>
    import firebase from "firebase";

    export default {
        name: "SignedInDashboard",
        data: function() {
            return { error: null };
        },

        computed: {
            user: function() {
                return this.$store.state.user;
            }
        },

        methods: {
            saveHoldingsToAccount() {
                this.user.db.ref("portfolios/" + this.user.uid).set({
                    holdings: this.user.holdings
                });
            },

            signOut() {
                this.saveHoldingsToAccount();

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
                    .then(() => {
                        this.$store.dispatch("clearUserData", this.user);
                    })
                    .catch(err => {
                        this.error = err.message;
                    });
            }
        }
    };
</script>

<style scoped>
    .error-message {
        color: #ff4136;
    }
</style>
