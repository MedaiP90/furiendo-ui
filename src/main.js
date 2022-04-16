import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

// Appropriate title
document.title = "フリエンド - Amici di sushi";

Vue.config.productionTip = false;

// Create app events bus
Vue.prototype.$bus = new Vue();

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
