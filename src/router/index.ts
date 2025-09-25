import type { RouteLocationNormalized } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import StoreView from "@/views/StoreView.vue";
import CartView from "@/views/CartView.vue";
import ProfileView from "@/views/ProfileView.vue";
import ProductView from "@/views/ProductView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView
  },
  {
    path: "/store",
    name: "store",
    component: StoreView,
  },
  {
    path: "/cart",
    name: "cart",
    component: CartView
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView
  },
  {
    path: "/product/:slug",
    name: "product",
    component: ProductView,
    props: (route: RouteLocationNormalized) => ({slug: (route.params.slug)})
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition)
      return savedPosition;
    return { top: 0 };
  }
});

export default router;