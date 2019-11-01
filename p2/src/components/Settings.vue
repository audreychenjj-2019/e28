<template>
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

    <button v-on:click="changeQuizSettings = false; $emit('fetch-quiz', generatedURL)">Start Quiz</button>
  </div>
  <div v-else>
    Current Quiz Settings: Category is {{categorySelected.readable}}. Difficulty level is set to {{level}}.
    <button
      v-on:click="changeQuizSettings=true, quizOn=false"
    >Change/Reset Settings</button>
  </div>
</template>


<script>
export default {
  props: {
    quizOn: Boolean
  },
  data: function() {
    return {
      baseURL: "https://opentdb.com/api.php?amount=10&type=multiple",
      categorySelected: { id: "17", readable: "Science & Nature" },
      categories: [
        { id: "9", readable: "General Knowledge" },
        { id: "10", readable: "Entertainment: Books" },
        { id: "17", readable: "Science & Nature" },
        { id: "18", readable: "Science: Computers" },
        { id: "21", readable: "Sports" },
        { id: "22", readable: "Geography" },
        { id: "23", readable: "History" },
        { id: "27", readable: "Animals" },
        { id: "28", readable: "Vehicles" }
      ],
      level: "any",
      changeQuizSettings: true
    };
  },
  computed: {
    generatedURL: function() {
      let tempURL = this.baseURL;
      if (this.categorySelected != "any") {
        tempURL = tempURL.concat("&category=").concat(this.categorySelected.id);
      }
      if (this.level != "any") {
        tempURL = tempURL.concat("&difficulty=").concat(this.level);
      }
      return tempURL;
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

