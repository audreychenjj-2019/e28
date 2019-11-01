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

    <button v-on:click="startQuiz">Start Quiz</button>
  </div>
  <div v-else>
    Settings: Category = {{categorySelected.readable}}. Difficulty = {{level}}.
    <button
      v-on:click="stopQuiz"
    >Change/Reset Settings</button>
  </div>
</template>


<script>
export default {
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
  },
  methods: {
    startQuiz: function() {
      this.changeQuizSettings = false;
      this.$emit("fetch-quiz", this.generatedURL);
    },
    stopQuiz: function() {
      this.changeQuizSettings = true;
      this.$emit("stop-quiz");
    }
  }
};
</script>



<style scoped>
</style>