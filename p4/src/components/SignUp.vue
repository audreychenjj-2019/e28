<template>
    <div class="container">
        <h3>SignUp</h3>

        <div v-if="error">{{ error }}</div>
        <form action="#" @submit.prevent="submit">
            <div class="form-group">
                <label for="name">Name (Min: 2 characters)</label>

                <div>
                    <input
                        data-test="input-name-signup"
                        type="name"
                        value
                        required
                        autofocus
                        v-model="$v.form.name.$model"
                    />
                    <div v-if="$v.form.name.$error">
                        <div class="form-feedback-error" v-if="!$v.form.name.required">A name is required</div>
                        <div class="form-feedback-error" v-else-if="!$v.form.name.minLength">
                            Name must be at least 2 characters long
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label for="email">Email (will be username)</label>

                <div>
                    <input
                        data-test="input-email-signup"
                        type="email"
                        value
                        required
                        autofocus
                        v-model="$v.form.email.$model"
                    />
                </div>

                <div v-if="$v.form.email.$error">
                    <div class="form-feedback-error" v-if="!$v.form.email.required">Email is required</div>
                    <div class="form-feedback-error" v-else-if="!$v.form.email.email">Type valid email address</div>
                </div>
            </div>

            <div class="form-group">
                <label for="password">Password (Min: 6 characters)</label>

                <div>
                    <input
                        data-test="input-password-signup"
                        type="password"
                        required
                        v-model="$v.form.password.$model"
                    />
                </div>

                <div v-if="$v.form.password.$error">
                    <div class="form-feedback-error" v-if="!$v.form.password.required">Password is required</div>
                    <div class="form-feedback-error" v-else-if="!$v.form.password.minLength">
                        Type at least 6 characters
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="confirmPassword">Confirm Password</label>

                <div>
                    <input
                        data-test="input-password-confirm-signup"
                        type="password"
                        required
                        v-model="$v.form.confirmPassword.$model"
                    />
                </div>
                <div v-if="$v.form.confirmPassword.$error">
                    <div class="form-feedback-error" v-if="!$v.form.confirmPassword.required">Password is required</div>
                    <div class="form-feedback-error" v-else-if="!$v.form.confirmPassword.minLength">
                        Type at least 6 characters
                    </div>
                    <div class="form-feedback-error" v-else-if="!$v.form.confirmPassword.sameAs">
                        Passwords entered must match
                    </div>
                </div>
            </div>
            <button data-test="button-signup" type="submit">SignUp</button>
        </form>
    </div>
</template>

<script>
    import firebase from "firebase";
    import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

    export default {
        name: "SignUp",
        data() {
            return {
                form: {
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                },
                error: null
            };
        },
        validations: {
            form: {
                name: { required, minLength: minLength(2) },
                email: { required, email },
                password: { required, minLength: minLength(6) },
                confirmPassword: {
                    required,
                    sameAsPassword: sameAs("password"),
                    minLength: minLength(6)
                }
            }
        },
        methods: {
            submit() {
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(this.form.email, this.form.password)
                    .then(profile => {
                        profile.user
                            .updateProfile({
                                displayName: this.form.name
                            })
                            .then(() => {});
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
</style>
