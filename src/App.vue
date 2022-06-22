<template>
  <div id="app">
    <div id="rete"></div>
  </div>
</template>

<script>
import { createEditor } from "./editor.js";
import "./editor.css";


export default {
  mounted() {
    createEditor();
  }
}
</script>

<style>
#app {
    width: 95%;
    height: 600px;
}

#rete {
    margin: 0 auto;
    width: 99%;
    height: 100%;
    border: 1px solid #333;
}
</style>
