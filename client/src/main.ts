import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";
import { VueQueryPlugin } from "@tanstack/vue-query";

createApp(App)
  .use(router)
  .use(VueQueryPlugin)
  .use(require("vue-cookies"))
  .mount("#app");
