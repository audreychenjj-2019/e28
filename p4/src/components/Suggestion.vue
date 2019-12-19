<template lang="html">
    <div :class="wrapperClasses" class="vue-suggestion">
        <div :class="[{ 'vue-suggestion-selected': value }, inputWrapperClasses]" class="vue-suggestion-input-group">
            <input
                v-model="searchText"
                :class="inputClasses"
                :placeholder="placeholder"
                :disabled="disabled"
                type="search"
                data-test="input-autocomplete"
                class="vue-suggestion-input"
                @blur="blur"
                @focus="focus"
                @input="inputChange"
                @keydown.enter.prevent="keyEnter"
                @keydown.up.prevent="keyUp"
                @keydown.down.prevent="keyDown"
            />
            <slot name="searchSlot" />
        </div>
        <slot v-if="loading" name="loading" class="vue-suggestion-loading">
            Loading...
        </slot>
        <slot v-else-if="showList" :class="suggestionListClasses" name="suggestionList" class="vue-suggestion-list">
            <div
                v-for="(item, i) in items"
                :key="i"
                :class="[{ 'vue-suggestion-item-active': i === cursor }, suggestionItemWrapperClasses]"
                data-test="input-symbol"
                class="vue-suggestion-list-item"
                @click="selectItem(item)"
                @mouseover="cursor = i"
            >
                <div :class="suggestionItemClasses" :is="itemTemplate" :item="item" />
            </div>
        </slot>
    </div>
</template>

<script>
    export default {
        name: "VueSuggestion",
        props: {
            itemTemplate: {
                type: Object,
                required: true
            },
            minLen: { type: Number, default: 2 },
            value: {
                type: [Object, String, Number],
                default: null
            },
            setLabel: { type: Function, default: item => item },
            items: { type: Array, default: () => [] },
            disabled: { type: Boolean, default: false },
            loading: { type: Boolean, default: false },
            placeholder: { type: String, default: "" },
            inputClasses: { type: String, default: "" },
            wrapperClasses: { type: String, default: "" },
            inputWrapperClasses: { type: String, default: "" },
            suggestionListClasses: { type: String, default: "" },
            suggestionGroupClasses: { type: String, default: "" },
            suggestionGroupHeaderClasses: { type: String, default: "" },
            suggestionItemWrapperClasses: { type: String, default: "" },
            suggestionItemClasses: { type: String, default: "" }
        },
        data() {
            return {
                searchText: "",
                showList: false,
                cursor: 0
            };
        },
        watch: {
            value: {
                handler(value) {
                    if (!value) {
                        return;
                    }
                    this.searchText = this.setLabel(value);
                },
                deep: true
            },
            "items.length": function() {
                // Items might be changed from Promise after searching
                // So we need the check if we should show the suggestion list
                this.showList = this.isAbleToShowList();
            }
        },
        mounted() {
            if (this.value) {
                this.searchText = this.setLabel(this.value);
            }
        },
        methods: {
            inputChange() {
                this.showList = this.isAbleToShowList();
                this.cursor = 0;
                this.$emit("onInputChange", this.searchText);
            },
            isAbleToShowList() {
                return (this.searchText || "").length >= this.minLen && this.items.length > 0;
            },
            focus() {
                this.$emit("focus", this.searchText);
                this.showList = this.isAbleToShowList();
            },
            blur() {
                this.$emit("blur", this.searchText);
                // set timeout for the click event to work
                setTimeout(() => {
                    this.showList = false;
                }, 200);
            },
            selectItem(item) {
                // mouse selection of items comes here
                if (item) {
                    this.searchText = this.setLabel(item);
                    this.$emit("onItemSelected", item);
                }
                this.$emit("input", item);
            },
            keyUp() {
                this.$emit("keyUp", this.searchText);
                if (this.cursor > 0) {
                    this.cursor -= 1;
                }
            },
            keyDown() {
                this.$emit("keyDown", this.searchText);
                if (this.cursor < this.items.length - 1) {
                    this.cursor += 1;
                }
            },
            keyEnter() {
                if (this.showList && this.items[this.cursor]) {
                    this.selectItem(this.items[this.cursor]);
                    this.showList = false;
                }
                this.$emit("onEnter", this.items[this.cursor]);
            }
        }
    };
</script>

<style scoped>
    .vue-suggestion {
        position: relative;
    }

    .vue-suggestion .vue-suggestion-list {
        position: absolute;
    }

    .vue-suggestion .vue-suggestion-list .vue-suggestion-list-item {
        cursor: pointer;
    }

    .vue-suggestion-input {
        display: block;
        padding: 0.5rem 0.8rem;
        font-size: 0.9rem;
        line-height: 1.25;
        background-color: #fff;
        border: 1px solid dodgerblue;
        border-radius: 0.25rem;
    }

    .vue-suggestion-list {
        border: 1px solid dodgerblue;
    }

    .vue-suggestion-list-item {
        text-align: left;
        border: 1px solid dodgerblue;
        padding: 5px;
    }

    .vue-suggestion-list-item:hover {
        background-color: aquamarine;
    }

    .vue-suggestion-item-active {
        background-color: aquamarine;
    }
</style>
