<template>
    <div id="PortfolioRow" class="portfolio-row">
        <form @submit.prevent="handleSubmit">
            <div class="table-row">
                <div class="table-cell table-cell-no-buttons" v-for="(value, key) in portfolioRow" v-bind:key="key">
                    <label v-if="key == 'symbol'">
                        <router-link data-test="router-portfolio-to-research" :to="{ name: 'research', params: { symbolId: value } }">{{ value }}</router-link>
                    </label>

                    <div class="form-group" v-else-if="modeEditConfirm == 'Confirm' && key == 'shares'">
                        <input data-test="input-edit-shares" class="input" v-model.number="$v.holdingsRow.shares.$model" />
                        <div v-if="$v.holdingsRow.shares.$error">
                            <div class="form-feedback-error" v-if="!$v.holdingsRow.shares.required">Number of shares is required</div>
                            <div class="form-feedback-error" v-else-if="!$v.holdingsRow.shares.numeric">Must be integer and positive</div>
                            <div class="form-feedback-error" v-else-if="!$v.holdingsRow.shares.greaterThanOne">Must be 1 or more</div>
                        </div>
                    </div>

                    <div class="form-group" v-else-if="modeEditConfirm == 'Confirm' && key == 'cost'">
                        <input data-test="input-edit-cost" class="input" @keyup.enter="handleSubmit" v-model.number="$v.holdingsRow.cost.$model" />
                        <div v-if="$v.holdingsRow.cost.$error">
                            <div class="form-feedback-error" v-if="!$v.holdingsRow.cost.required">Cost is required</div>
                            <div class="form-feedback-error" v-else-if="!$v.holdingsRow.cost.positive">Must be positive</div>
                        </div>
                    </div>

                    <label v-else>{{ value }}</label>
                </div>

                <div class="table-cell table-cell-buttons">
                    <button
                        data-test="button-edit"
                        class="button-edit"
                        :disabled="(portfolioEditStatus != holdingsRow.symbol && portfolioEditStatus != null) || formHasErrors"
                        type="submit"
                    >
                        {{ modeEditConfirm }}
                    </button>
                    <button
                        data-test="button-delete"
                        class="button-delete"
                        :disabled="modeEditConfirm == 'Confirm' || (portfolioEditStatus != holdingsRow.symbol && portfolioEditStatus != null)"
                        type="button"
                        v-on:click="deletePressed(holdingsRow.symbol)"
                    >
                        Delete
                    </button>
                    <div class="form-feedback-error" v-if="formHasErrors">Please correct errors in this row</div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import { required, numeric } from "vuelidate/lib/validators";

    export default {
        name: "PortfolioRow",
        props: {
            holdingsRow: { type: Object, required: false, default: () => {} },
            portfolioRow: { type: Object, required: false, default: () => {} }
        },
        data: function() {
            return {
                modeEditConfirm: "Edit",
                formHasErrors: false
            };
        },
        computed: {
            portfolioEditStatus: function() {
                return this.$store.state.portfolioEditStatus;
            }
        },
        validations: {
            holdingsRow: {
                shares: {
                    required,
                    numeric,
                    greaterThanOne(value) {
                        return parseInt(value) >= 1;
                    }
                },
                cost: {
                    required,
                    positive(value) {
                        return parseFloat(value) >= 0;
                    }
                }
            }
        },
        watch: {
            modeEditConfirm: {
                handler: function() {
                    if (this.modeEditConfirm == "Confirm") {
                        this.$store.commit("setPortfolioEditStatus", this.holdingsRow.symbol);
                    } else {
                        this.$store.commit("setPortfolioEditStatus", null);
                    }
                },
                deep: true
            },
            "$v.$anyError": function() {
                this.formHasErrors = this.$v.$anyError;
            }
        },

        methods: {
            handleSubmit: function() {
                if (!this.formHasErrors) {
                    this.editConfirmPressed();
                }
            },
            editConfirmPressed(holdingsRow) {
                if (this.modeEditConfirm == "Confirm") {
                    this.modeEditConfirm = "Edit";
                    this.$emit("editConfirmPressed", holdingsRow);
                } else {
                    this.modeEditConfirm = "Confirm";
                }
            },
            deletePressed: function(symbol) {
                this.$emit("deletePressed", symbol);
            }
        }
    };
</script>

<style scoped>
    .table-row {
        width: 100%;
    }

    .table-cell {
        float: left;
        min-height: 50px;
        padding-bottom: 0.5%;
        padding-top: 0.5%;
        display: flex; /* allows alignment */
        align-items: center; /* vertical alignment */
        justify-content: center; /* horizontal alignment */
    }

    .table-cell-no-buttons {
        width: 12%;
    }

    .table-cell-buttons {
        width: 15%;
    }

    .input {
        position: relative;
        display: block;
        margin: 0 auto; /* centering input box within div */
        text-align: center;
        width: 80%;
        line-height: 2; /* setting height of input box */
        background-color: #fff;
        border: 1px solid dodgerblue;
        border-radius: 0.25rem;
    }

    .form-feedback-error {
        color: red;
        text-align: center;
        font-size: small;
    }

    .button-edit {
        width: 45%;
        margin: 1%;
    }

    .button-edit:before {
        content: "\270E";
        font-weight: bold;
    }

    .button-delete {
        width: 45%;
        margin: 1%;
    }

    .button-delete:before {
        content: "\2718";
        font-weight: bold;
    }
</style>
