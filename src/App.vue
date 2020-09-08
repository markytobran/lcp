<template>
  <div id="app">
    <intro v-if="intro" firstName="Mark" submissionDate="5pm Thursday (3rd September)" />
    <loan v-if="loan" />
    <result v-else-if="result" />
  </div>
</template>

<script>
import intro from "./components/intro";
import loan from "./components/loan";
import result from "./components/result";

export default {
  name: "App",
  components: {
    intro,
    loan,
    result,
  },
  created() {
    console.log(this.$store);
  },
  computed: {
    intro() {
      return this.$store.state.showIntro;
    },
    loan() {
      return this.$store.state.showLoan;
    },
    result() {
      return this.$store.state.showResult;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;900&display=swap");

#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #272829;
  color: #fff;
  overflow-x: hidden;
}

*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  font-size: 62.5%;
}

body {
  box-sizing: border-box;
}

::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  border: 7px solid #000;
  box-shadow: inset 0 0 2.5px 2px rgba(0, 0, 0, 0.5);
}

::-webkit-scrollbar-thumb {
  background: #ffb7c5;
  border-radius: 3px;
}
</style>
