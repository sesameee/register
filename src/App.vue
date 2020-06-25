<template>
  <Register />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Register from "./components/Register.vue";

@Component({
  components: {
    Register
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
