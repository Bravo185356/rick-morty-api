import { createWebHistory, createRouter } from "vue-router";
import App from "@/App.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { 
      path: "/",
      name: 'list',
      component: App 
    },
  ],
});

export default router;
