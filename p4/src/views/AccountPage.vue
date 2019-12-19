<template>
    <div class="account-container">
        <div class="floating-layout">
            <div v-if="user.loggedIn == true" class="one-floater">
                <signedin-dashboard />
            </div>
            <div v-else-if="user.loggedIn == false" class="one-floater">
                <div class="one-floater">
                    <signin-page />
                </div>
                <div class="one-floater">OR</div>
                <div class="one-floater">
                    <signup-page />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SignIn from "@/components/SignIn.vue";
import SignUp from "@/components/SignUp.vue";
import SignedInDashboard from "@/components/SignedInDashboard.vue";

export default {
    components: {
        "signin-page": SignIn,
        "signup-page": SignUp,
        "signedin-dashboard": SignedInDashboard
    },

    computed: {
        user: function() {
            return this.$store.state.user;
        }
    }
};
</script>

<style style scoped>
.account-container {
    width: 100%;
    align-content: center;
}

.floating-layout {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    float: left;
}

.one-floater {
    position: relative;
    float: left;
    vertical-align: top;
    padding: 20px;
}
</style>
