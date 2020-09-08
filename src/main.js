// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import store from "./store/index.js";
import VueToasted from "vue-toasted";

Vue.config.productionTip = false;

Vue.use(VueToasted, {
  iconPack: "fontawesome",
});

/* eslint-disable no-new */
new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
