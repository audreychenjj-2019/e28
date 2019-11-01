<template>
  <div id="app" v-cloak>
    <h2>Welcome to a Fun 10-Question Quiz</h2>
    <br />

    <div v-if="changeQuizSettings">
      <label>Category:</label>
      <select v-model="categorySelected">
        <option
          v-for="category in categories"
          v-bind:value="{ id: category.id, readable: category.readable }"
          v-bind:key="category.id"
        >{{ category.readable }}</option>
      </select>

      <label>Difficulty:</label>
      <select v-model="level">
        <option value="any">Any Difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <button v-on:click="loadQuiz">Start Quiz</button>
    </div>
    <div v-else>
      Current Quiz Settings: Category is {{categorySelected.readable}}. Difficulty level is set to {{level}}.
      <button
        v-on:click="changeQuizSettings=true, quizOn=false"
      >Change/Reset Settings</button>
    </div>

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
      numTotal: 0,
      quizOn: false,
      baseURL: "https://opentdb.com/api.php?amount=10&type=multiple",
      questionBankURL: "",
      categorySelected: { id: "17", readable: "Science & Nature" },
      categories: [
        { id: "9", readable: "General Knowledge" },
        { id: "10", readable: "Entertainment: Books" },
        { id: "17", readable: "Science & Nature" },
        { id: "18", readable: "Science: Computers" },
        { id: "22", readable: "Geography" },
        { id: "23", readable: "History" },
        { id: "27", readable: "Animals" },
        { id: "28", readable: "Vehicles" }
      ],
      level: "any",
      changeQuizSettings: true
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

    loadQuiz: function() {
      this.generateUrlFromSettings();
      this.fetchQuiz();
      this.index = 0;
      this.allQuestionsDone = false;
      this.numCorrect = 0;
      this.numTotal = 0;
      this.quizOn = true;
    },

    generateUrlFromSettings: function() {
      this.questionBankURL = this.baseURL;
      if (this.categorySelected != "any") {
        this.questionBankURL = this.questionBankURL
          .concat("&category=")
          .concat(this.categorySelected.id);
      }
      if (this.level != "any") {
        this.questionBankURL = this.questionBankURL
          .concat("&difficulty=")
          .concat(this.level);
      }
      this.changeQuizSettings = false;
    },

    fetchQuiz: function() {
      this.questions = "";
      fetch(this.questionBankURL, {
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
