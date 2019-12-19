<template>
    <div id="StockSuggestion" class="component-autocomplete">
        <div class="table-cell">
            <suggest-select
                :items="items"
                v-model="item"
                :setLabel="setLabel"
                :inputClasses="'input-box'"
                :minLen="1"
                :placeholder="placeholder"
                :itemTemplate="itemTemplate"
                @onInputChange="inputChange"
                @onItemSelected="itemSelected"
            ></suggest-select>
            <button v-if="showButton" v-on:click="onEnter">Research</button>
        </div>
    </div>
</template>

<script>
    import Suggestion from "@/components/Suggestion.vue";
    import itemTemplate from "@/components/ItemTemplate.vue";
    import symbolsList from "@/symbols.js";

    export default {
        name: "StockSuggestion",
        components: {
            "suggest-select": Suggestion
        },
        props: {
            showButton: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        data: function() {
            return {
                item: {},
                items: symbolsList,
                itemTemplate,
                symbolsList: symbolsList,
                placeholder: "Company Name/Symbol"
            };
        },
        methods: {
            itemSelected(item) {
                this.item = item;
                this.onEnter();
            },
            setLabel(item) {
                return item.name;
            },
            inputChange(text) {
                this.items = [
                    ...new Set(
                        this.symbolsList
                            .filter(item => new RegExp(text.toLowerCase()).test(item.symbol.toLowerCase()))
                            .concat(
                                this.symbolsList.filter(item =>
                                    new RegExp(text.toLowerCase()).test(item.name.toLowerCase())
                                )
                            )
                    )
                ]
                    .sort(
                        (a, b) =>
                            (a.symbol + a.name).toLowerCase().indexOf(text.toLowerCase()) -
                            (b.symbol + b.name).toLowerCase().indexOf(text.toLowerCase())
                    )
                    .slice(0, 8);
                if (this.items.length == 1) {
                    this.itemSelected(this.items[0]);
                    this.onEnter();
                }
            },
            onEnter() {
                if (this.symbolsList.find(company => company.symbol == this.item.symbol)) {
                    this.$emit("symbolentered", this.item.symbol);
                }
            }
        }
    };
</script>

<style scoped>
    .component-autocomplete {
        width: 204px;
    }

    .table-cell {
        display: inline-block;
    }
</style>
