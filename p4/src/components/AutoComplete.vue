<template>
    <div
        v-bind:style="[
            showButton ? { width: '315px' } : { width: '180px' },
            autocomplete
        ]"
    >
        <!-- <label v-if="showLabel">Symbol:</label> -->

        <input
            type="text"
            id="autoCompleteText"
            autocomplete="off"
            placeholder="Choose Symbol, hit Enter"
            v-on:input="onChange"
            v-model="search"
            v-on:keydown.down="onArrowDown"
            v-on:keydown.up="onArrowUp"
            v-on:keydown.enter="onKeyDownEnter"
            v-on:enter="onEnter"
            v-on:click="onEnter"
            vbind:key="symbol"
            v-bind:style="{ width: '150px' }"
        />

        <button v-if="showButton" v-on:click="onEnter">Research</button>

        <ul
            v-if="dropdownOpen"
            id="autocomplete-results"
            class="autocomplete-results"
        >
            <li class="loading" v-if="isLoading">Loading results...</li>
            <li
                v-else
                v-for="(result, i) in results"
                v-bind:key="i"
                v-on:click="setResult(result)"
                class="autocomplete-result"
                v-bind:style="{ 'is-active': i === arrowCounter }"
            >
                {{ result.symbol }}: {{ result.name }}
            </li>
        </ul>
    </div>
</template>

<script>
    import symbolsList from "@/symbols.js";

    export default {
        name: "autocomplete",
        props: {
            showButton: {
                type: Boolean,
                required: false,
                default: false
            },
            showLabel: {
                type: Boolean,
                required: false,
                default: false
            },
            symbol: {
                type: String,
                required: false,
                default: ""
            },
            isAsync: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        data() {
            return {
                dropdownOpen: false,
                symbolsList: symbolsList,
                results: [],
                search: "",
                isLoading: false,
                arrowCounter: 0,
                autocomplete: {
                    padding: 0,
                    border: "3px solid #0074d9",
                    margin: "auto"
                }
            };
        },
        methods: {
            onChange() {
                this.search = this.search.toUpperCase();
                this.filterResults(this.search, ["symbol", "name"]);
                this.dropdownOpen = true;
            },
            filterResults(search, keys) {
                var upperSearch = search.toUpperCase();
                this.results = this.symbolsList.filter(function(element) {
                    return keys.some(key =>
                        String(element[key])
                            .toUpperCase()
                            .includes(upperSearch)
                    );
                });
            },
            setResult(result) {
                this.search = result.symbol;
                this.dropdownOpen = false;
            },
            onArrowDown() {
                if (this.arrowCounter < this.results.length) {
                    this.arrowCounter = this.arrowCounter + 1;
                }
            },
            onArrowUp() {
                if (this.arrowCounter > 0) {
                    this.arrowCounter = this.arrowCounter - 1;
                }
            },
            onKeyDownEnter() {
                if (this.arrowCounter != -1) {
                    this.search = this.results[this.arrowCounter].symbol;
                }
                this.dropdownOpen = false;
                this.arrowCounter = -1;
                this.onEnter();
            },
            onEnter() {
                let valueInTextBox = document.getElementById("autoCompleteText")
                    .value;
                if (this.search == "") {
                    this.search = valueInTextBox;
                }
                if (
                    this.search != "" &&
                    this.symbolsList.filter(
                        element =>
                            element.symbol.toUpperCase().indexOf(this.search) ==
                            0
                    ).length > 0
                ) {
                    this.$emit("symbolentered", this.search);
                }
            }
        },
        watch: {
            symbols: function(val, oldValue) {
                if (val.length !== oldValue.length) {
                    this.results = val;
                    this.isLoading = false;
                }
            }
        },
        mounted() {
            this.search = this.symbol;
        },
        destroyed() {}
    };
</script>

<style>
    ul {
        list-style-type: none;
    }
    .autocomplete-results {
        border: 1px solid whitesmoke;
        height: 120px;
        overflow: auto;
        width: 100%;
        padding-left: 3px;
        margin-top: 3px;
        margin-bottom: 1px;
    }
    .autocomplete-result {
        list-style-type: none;
        margin: 0;
        padding: 0;
        text-align: left;
        cursor: pointer;
    }
    .autocomplete-result:hover {
        background-color: aqua;
        color: black;
    }
</style>
