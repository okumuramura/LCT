import "babel-polyfill"
// require("babel-core/register");

import Logger from "js-logger"
import Vue from 'vue'
import App from './App.vue'

Logger.useDefaults();
Logger.setLevel(Logger.DEBUG);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
