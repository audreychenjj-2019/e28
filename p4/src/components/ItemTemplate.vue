<template>
    <div>
        <b>{{ item.symbol }}</b>
        <span>: {{ item.name }}</span>
    </div>
</template>

<script>
    export default {
        props: {
            item: { required: true }
        }
    };
</script>
