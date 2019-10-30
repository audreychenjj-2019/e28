<template>
  <div id="app" v-cloak>
    <h2>Welcome to a Fun 10-Question Quiz</h2>
    <br />
    <Question
      v-if="questions.length"
      :currentQuestion="questions[index]"
      :next="next"
      :increment="increment"
      :allQuestionsDone="allQuestionsDone"
      :numTotal="numTotal"
    />
    <br />
    <Conclusion :numCorrect="numCorrect" :numTotal="numTotal" :allQuestionsDone="allQuestionsDone" />
  </div>
</template>



<script>
import Question from "./components/Question.vue";
import Conclusion from "./components/Conclusion.vue";

export default {
  name: "app",
  components: {
    Question,
    Conclusion
  },
  data() {
    return {
      questions: [],
      index: 0,
      allQuestionsDone: false,
      numCorrect: 0,
      numTotal: 0
    };
  },
  methods: {
    next() {
      if (this.index < 9) {
        this.index++;
      } else {
        this.allQuestionsDone = true;
      }
    },
    increment(isCorrect) {
      if (isCorrect) {
        this.numCorrect++;
      }
      this.numTotal++;
    }
  },
  mounted: function() {
    fetch(
      "https://opentdb.com/api.php?amount=10&category=17&difficulty=medium&type=multiple",
      {
        method: "get"
      }
    )
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        this.questions = jsonData.results;
      });
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
</style>
