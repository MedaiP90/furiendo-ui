import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import "@mdi/font/css/materialdesignicons.css";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi",
  },
  theme: {
    themes: {
      dark: {
        primary: "#EF6C00",
      },
      light: {
        primary: "#EF6C00",
      },
    },
  },
});
