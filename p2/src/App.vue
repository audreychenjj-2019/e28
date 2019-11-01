<template>
  <div id="app" v-cloak>
    <h2>Welcome to a Fun 10-Question Quiz</h2>
    <br />

    <Settings v-on:fetch-quiz="loadQuiz" v-on:stop-quiz="haltQuiz" />

    <br />
    <div v-if="quizOn">
      <Question
        v-if="questions.length"
        :currentQuestion="questions[index]"
        :next="next"
        :increment="increment"
        :allQuestionsDone="allQuestionsDone"
        :numTotal="numTotal"
      />
      <br />
      <Conclusion
        :numCorrect="numCorrect"
        :numTotal="numTotal"
        :allQuestionsDone="allQuestionsDone"
      />
    </div>
  </div>
</template>

<script>
import Settings from "./components/Settings.vue";
import Question from "./components/Question.vue";
import Conclusion from "./components/Conclusion.vue";
export default {
  name: "app",
  components: {
    Question,
    Conclusion,
    Settings
  },
  data() {
    return {
      questions: [],
      index: 0,
      allQuestionsDone: false,
      numCorrect: 0,
      numTotal: 0,
      quizOn: false
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
    },
    haltQuiz: function() {
      this.quizOn = false;
    },
    loadQuiz: function(questionBankURL) {
      this.fetchQuiz(questionBankURL);
      this.index = 0;
      this.allQuestionsDone = false;
      this.numCorrect = 0;
      this.numTotal = 0;
      this.quizOn = true;
    },
    fetchQuiz: function(questionBankURL) {
      this.questions = "";

      fetch(questionBankURL, {
        method: "get"
      })
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          this.questions = jsonData.results;
        });
    }
  },
  mounted: function() {}
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
label {
  margin: 0 20px;
  font-size: 16px;
}
button {
  margin: 0 15px;
  font-size: 16px;
}
</style>