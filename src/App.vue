<template>
  <div id="app">
    <div id="rete"></div>
    <pre id="json-output">
    </pre>
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
    width: 100%;
    height: 100%;
    display: flex;
}

#rete {
    margin: 0 auto;
    width: 100%;
    height: 100%;
    /* border: 1px solid #333; */
}
</style>
