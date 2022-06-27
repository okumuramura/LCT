<template>
  <div id="app">
    <div id="rete"></div>
    <pre id="json-output">
      {1: "hello", 2: "world!"}
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

#json-output {
  padding-left: 5px;
  width: 20%;
  border-left: 1px solid black;
  height: auto;
  max-height: 100%;
  overflow: auto;
  /* background-color: #eeeeee; */
  word-break: normal !important;
  word-wrap: normal !important;
  white-space: pre !important;
}

#rete {
    margin: 0 auto;
    width: 100%;
    height: 100%;
    /* border: 1px solid #333; */
}
</style>
