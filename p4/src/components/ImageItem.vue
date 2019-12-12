<template>
    <figure v-lazyload class="image__wrapper">
        <img
            class="image__item"
            :data-url="source"
            alt="relevant image"
            onerror="this.style.display='none'"
        />
    </figure>
</template>

<script>
    import LazyLoadDirective from "@/directives/LazyLoadDirective.js";

    export default {
        name: "ImageItem",
        data: function() {
            return {};
        },
        props: {
            source: {
                type: String,
                required: true
            },
            width: {
                type: String,
                required: false,
                default: "auto"
            },
            height: {
                type: String,
                required: false,
                default: "auto"
            }
        },
        directives: {
            lazyload: LazyLoadDirective
        }
    };
</script>

<style scoped lang="scss">
    .image {
        &__wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 4px;
            margin: 5px;

            &.loaded {
                .image {
                    &__item {
                        visibility: visible;
                        opacity: 1;
                        border: 0;
                    }
                }
            }
        }

        &__item {
            width: 100%;
            border-radius: 4px;
            transition: all 0.4s ease-in-out;
            opacity: 0;
            visibility: hidden;
        }
    }
</style>
