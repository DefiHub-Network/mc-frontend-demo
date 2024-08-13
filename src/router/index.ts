import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "payment",
    component: () => import("@/views/payment/index.vue"),
    children: [],
  },
  {
    path: "/fail",
    name: "fail",
    component: () => import("@/views/payment/fail.vue"),
    children: [],
  },
  {
    path: "/success",
    name: "success",
    component: () => import("@/views/payment/success.vue"),
    children: [],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
export default router;
