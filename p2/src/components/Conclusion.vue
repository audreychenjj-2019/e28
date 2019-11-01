<template>
  <div v-if="numTotal > 0" v-cloak>
    <div v-if="numTotal<10">You got {{ numCorrect }} out of {{ numTotal }} right.</div>
    <div
      v-if="numTotal==10"
    >End of the quiz. You got {{ numCorrect }} out of {{ numTotal }} right. Want to take another quiz? Click the Change/Reset Settings button on the top.</div>
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