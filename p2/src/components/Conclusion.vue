<template>
  <div v-if="numTotal > 0" v-cloak>
    <div v-if="!allQuestionsDone">You got {{ numCorrect }} out of {{ numTotal }} right.</div>
    <div v-else>End of the quiz. You got {{ numCorrect }} out of {{ numTotal }} right.</div>
  </div>
</template>

<script>
export default {
  props: ["numCorrect", "numTotal", "allQuestionsDone"]
};
</script>

<style>
[v-cloak] {
  display: none;
}
</style>