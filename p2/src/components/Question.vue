<template>
  <div>
    <ul class="questionUL">{{ decodedQuestion }}</ul>
    <br />
    <br />
    <ol type="A">
      <li
        v-for="(answer, index) in shuffledAnswers"
        :key="index"
        @click.prevent="selectAnswer(index)"
        :class="answerClass(index)"
      >
        {{ answer }}
        <div v-if="answerClass(index)=='correct' && selectedIndex == correctIndex">You got it right!</div>
        <div v-else-if="answerClass(index)=='correct'">The correct answer!</div>
      </li>
    </ol>
    <br />
    <div v-if="answered">
      <button
        v-if="!allQuestionsDone && numTotal<10 && answered"
        v-on:click="next"
        variant="success"
      >Next</button>
    </div>
    <div v-else>
      <button
        variant="primary"
        v-on:click="submitAnswer"
        v-bind:disabled="selectedIndex === null || answered"
      >Submit</button>
    </div>
    <br />
  </div>
</template>


<script>
export default {
  props: {
    currentQuestion: Object,
    next: Function,
    increment: Function,
    allQuestionsDone: Boolean,
    numTotal: Number
  },
  data: function() {
    return {
      selectedIndex: null,
      correctIndex: null,
      shuffledAnswers: [],
      decodedQuestion: "",
      answered: false
    };
  },
  computed: {
    unshuffledAnswers() {
      let answers = [...this.currentQuestion.incorrect_answers];
      answers.push(this.currentQuestion.correct_answer);
      return answers;
    }
  },
  watch: {
    currentQuestion: {
      immediate: true,
      handler() {
        this.selectedIndex = null;
        this.answered = false;
        this.shuffleAnswers();
        this.decodedQuestion = this.decode(this.currentQuestion.question);
      }
    }
  },
  methods: {
    decode: function(html) {
      var txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    },
    selectAnswer(index) {
      this.selectedIndex = index;
    },
    submitAnswer() {
      let isCorrect = false;
      if (this.selectedIndex === this.correctIndex) {
        isCorrect = true;
      }
      this.answered = true;
      this.increment(isCorrect);
    },
    shuffleAnswers() {
      this.correctIndex = Math.floor(Math.random() * Math.floor(4));
      this.shuffledAnswers[this.correctIndex] = this.decode(
        this.currentQuestion.correct_answer
      );
      for (let i = 0, incorrecti = 0; i < 4; i++) {
        if (i != this.correctIndex) {
          this.shuffledAnswers[i] = this.decode(
            this.currentQuestion.incorrect_answers[incorrecti]
          );
          incorrecti++;
        }
      }
    },
    answerClass(index) {
      let answerClass = "";
      if (!this.answered && this.selectedIndex === index) {
        answerClass = "selected";
      } else if (this.answered && this.correctIndex === index) {
        answerClass = "correct";
      } else if (
        this.answered &&
        this.selectedIndex === index &&
        this.correctIndex !== index
      ) {
        answerClass = "incorrect";
      }
      return answerClass;
    }
  }
};
</script>



<style scoped>
body {
  width: 100%;
  max-width: 800px;
  min-width: 480px;
  margin: 100px 100px 100px 300px;
}
ol {
  list-style-position: outside;
  width: 34%;
  margin: auto;
  border: 2px solid black;
  padding: 10px 0px 10px 0px;
  border-radius: 4px;
  line-height: 180%;
}
li:hover {
  background: gainsboro;
  cursor: pointer;
}
button {
  margin: 0 15px;
  font-size: 16px;
}
.selected {
  background-color: lightgoldenrodyellow;
}
.correct {
  background-color: lightgreen;
}
.incorrect {
  background-color: red;
}
</style>
