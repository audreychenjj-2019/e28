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
    .vue-suggestion .vue-suggestion-list .vue-suggestion-list-item.vue-suggestion-item-active {
        background-color: whitesmoke;
    }

    .vue-suggestion .vue-suggestion-input-group .vue-suggestion-input {
        display: block;

        margin: 0 auto;
        padding: 0.5rem 0.7rem;
        font-size: 0.9rem;
        line-height: 1.25;
        color: darkblue;
        outline: none;
        background-color: #fff;
        background-image: none;
        background-clip: padding-box;
        border: 1px solid dodgerblue;
        border-radius: 0.25rem;
        transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
    }
    .vue-suggestion .vue-suggestion-input-group .vue-suggestion-input:focus {
        border: 1px solid #023d7b;
    }

    .vue-suggestion .vue-suggestion-list {
        width: 180px;
        text-align: left;
        border: none;
        border-top: none;
        max-height: 400px;
        overflow-y: auto;
        overflow: hidden;
        border-bottom: 1px solid #023d7b;
    }
    .vue-suggestion .vue-suggestion-list .vue-suggestion-list-item {
        cursor: pointer;
        background-color: red;
        padding: 10px;
        border-left: 10px solid #023d7b;
        border-right: 1px solid #023d7b;
    }
    .vue-suggestion .vue-suggestion-list .vue-suggestion-list-item:last-child {
        border-bottom: none;
    }
    .vue-suggestion .vue-suggestion-list .vue-suggestion-list-item:hover {
        background-color: #eee;
    }
</style>
