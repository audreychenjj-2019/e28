<template>
    <div id="NewHolding" class="newholding-component">
        <form @submit.prevent="handleSubmit">
            <div class="table-row" v-if="modeAddConfirm == 'Add'">
                <div class="table-row">
                    <div class="table-cell table-cell-no-buttons" v-for="empty in 7" :key="empty"></div>
                    <div class="table-cell table-cell-buttons">
                        <button data-test="button-add" class="button-add" :disabled="portfolioEditStatus != null" v-on:click="addPressed('')">Add</button>
                    </div>
                </div>
            </div>

            <div class="table-row" v-if="modeAddConfirm == 'Confirm'">
                <div class="table-cell table-cell-no-buttons">
                    <auto-complete v-if="symbolToAdd == ''" @symbolentered="symbolEntered" />
                    <label v-else>
                        <router-link :to="{ name: 'research', params: { symbolId: newHolding.symbol } }">
                            {{ newHolding.symbol }}
                        </router-link>
                    </label>
                </div>
                <div class="table-cell table-cell-no-buttons">
                    <div class="form-group">
                        <input data-test="input-shares" class="input" required v-model="$v.newHolding.shares.$model" />
                        <div v-if="$v.newHolding.shares.$error">
                            <div class="form-feedback-error" v-if="!$v.newHolding.shares.required">Number of shares is required</div>
                            <div class="form-feedback-error" v-else-if="!$v.newHolding.shares.numeric">Must be integer and positive</div>
                            <div class="form-feedback-error" v-else-if="!$v.newHolding.shares.greaterThanOne">Must be 1 or more</div>
                        </div>
                    </div>
                </div>
                <div class="table-cell table-cell-no-buttons">
                    <div class="form-group">
                        <input data-test="input-cost" class="input" required @keyup.enter="handleSubmit" v-model="$v.newHolding.cost.$model" />
                        <div v-if="$v.newHolding.cost.$error">
                            <div class="form-feedback-error" v-if="!$v.newHolding.cost.required">Cost is required</div>
                            <div class="form-feedback-error" v-else-if="!$v.newHolding.cost.positive">Must be positive</div>
                        </div>
                    </div>
                </div>
                <div class="table-cell table-cell-no-buttons" v-for="empty in 4" :key="empty"></div>
                <div class="table-cell table-cell-buttons">
                    <button data-test="button-confirm-add" class="button-confirm-add" :disabled="formHasErrors || newHolding.symbol == ''" type="submit">
                        Confirm
                    </button>

                    <button class="button-cancel" data-test="button-cancel" v-on:click="cancelPressed()">Cancel</button>
                    <div class="form-feedback-error" v-if="formHasErrors">Please correct errors in this row</div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import AutoComplete from "@/components/AutoComplete.vue";
    import { required, numeric } from "vuelidate/lib/validators";

    export default {
        name: "NewHolding",
        components: { "auto-complete": AutoComplete },
        props: {
            symbolToAdd: { type: String, default: "" }
        },
        data: function() {
            return {
                newHolding: { symbol: "", shares: 0, cost: 0 },
                modeAddConfirm: "Add",
                formHasErrors: false
            };
        },
        computed: {
            portfolioEditStatus: function() {
                return this.$store.state.portfolioEditStatus;
            }
        },
        validations: {
            newHolding: {
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
            modeAddConfirm: {
                handler: function() {
                    if (this.modeAddConfirm == "Confirm") {
                        this.$store.commit("setPortfolioEditStatus", "");
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
                if (!this.formHasErrors && this.newHolding.symbol != "") {
                    this.confirmPressed();
                }
            },
            symbolEntered: function(symbol) {
                this.newHolding.symbol = symbol;
            },
            addPressed: function(symbol) {
                this.newHolding = { symbol: symbol, shares: 1, cost: 0 };
                this.modeAddConfirm = "Confirm";
            },
            cancelPressed: function() {
                this.modeAddConfirm = "Add";
                if (this.symbolToAdd != "") {
                    this.$store.commit("setPortfolioEditStatus", null);
                    this.$router.go(-1);
                }
            },
            confirmPressed: function() {
                if (this.newHolding.symbol != "") {
                    this.modeAddConfirm = "Add";
                    this.newHolding.shares = parseInt(this.newHolding.shares);
                    this.newHolding.cost = parseFloat(this.newHolding.cost);
                    this.$emit("addConfirmPressed", this.newHolding);
                }
            }
        },
        mounted() {
            if (this.symbolToAdd != "") {
                this.addPressed(this.symbolToAdd.toUpperCase());
            }
        }
    };
</script>

<style scoped>
    .newholding-component {
        width: 100%;
    }

    .table-row {
        width: 100%;
    }

    .table-cell {
        float: left;
        min-height: 50px;
        padding-bottom: 0.5%;
        padding-top: 0.5%;
        display: flex; /* allows alignment */
        align-items: top; /* vertical alignment */
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
        text-align: center; /* text typed within input box */
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
        float: none;
    }

    .button-add {
        width: 48%;
        margin: 1%;
    }

    .button-add:before {
        content: "\271A";
    }

    .button-confirm-add {
        width: 48%;
        margin: 1%;
    }

    .button-confirm-add:before {
        content: "\2714";
    }

    .button-cancel {
        width: 48%;
        margin: 1%;
    }

    .button-cancel:before {
        content: "\2718";
    }
</style>
