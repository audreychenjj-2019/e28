<template>
    <div class="container">
        <h3>SignIn</h3>

        <div class="error-message" v-if="error">{{ error }}</div>
        <form action="#" @submit.prevent="submit">
            <div class="form-group">
                <label for="email">Email</label>
                <div>
                    <input data-test="input-email-signin" type="email" name="email" value required autofocus v-model="$v.form.email.$model" />
                </div>

                <div v-if="$v.form.email.$error">
                    <div class="form-feedback-error" v-if="!$v.form.email.required">Hint: Login with registered email</div>
                    <div class="form-feedback-error" v-else-if="!$v.form.email.email">Hint: Login is your email address</div>
                </div>
            </div>
            <div class="form-group">
                <label for="password">Password</label>

                <div>
                    <input data-test="input-password-signin" type="password" name="password" required v-model="$v.form.password.$model" />
                </div>

                <div v-if="$v.form.password.$error">
                    <div class="form-feedback-error" v-if="!$v.form.password.required">Password is required</div>
                    <div class="form-feedback-error" v-else-if="!$v.form.password.minLength">Type at least 6 characters</div>
                </div>
            </div>
            <button data-test="button-signin" type="submit">Login</button>
        </form>
    </div>
</template>

<script>
    import firebase from "firebase";
    import { required, email, minLength } from "vuelidate/lib/validators";

    export default {
        name: "SignIn",
        data() {
            return { form: { email: "", password: "" }, error: null };
        },
        validations: {
            form: {
                email: { required, email },
                password: { required, minLength: minLength(6) }
            }
        },
        methods: {
            submit() {
                firebase
                    .auth()
                    .signInWithEmailAndPassword(this.form.email, this.form.password)
                    .then(() => {
                        this.$store.commit("setMergeAccountAndLocalStorage", true);
                    })
                    .catch(err => {
                        this.error = err.message;
                    });
            }
        }
    };
</script>

<style scoped>
    .form-group {
        margin: 20px 0;
    }

    .form-feedback {
        font-size: 1.3rem;
        font-weight: bold;
        padding: 10px 0;
    }

    .form-feedback-error {
        color: red;
    }

    .form-feedback-success {
        color: green;
    }

    .error-message {
        color: #ff4136;
    }
</style>
