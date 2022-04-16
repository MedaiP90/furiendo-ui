import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import MenuView from "../views/MenuPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/menu/:menuId",
    name: "menu",
    component: MenuView,
  },
  {
    path: "*",
    name: "home",
    component: HomeView,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
