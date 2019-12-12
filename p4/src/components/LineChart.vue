<script>
    import { Line, mixins } from "vue-chartjs";
    const { reactiveProp } = mixins;

    export default {
        extends: Line,
        mixins: [reactiveProp],
        props: ["options"],
        mounted() {
            // this.chartData is created in the mixin.
            // To pass options, need to create a local options object
            this.renderChart(this.chartData, this.options);
        }
    };
</script>

<style></style>
