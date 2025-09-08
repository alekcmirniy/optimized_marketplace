<template>
  <div id="application">
    <header>
      <MainNavigation />
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script lang="ts">
import MainNavigation from "@/components/MainNavigation.vue";
import { useProductStore } from "./stores/ProductStore";
import { useCartStore } from "./stores/CartStore";
import { defineComponent } from "vue";
import { RouterView } from "vue-router";

export default defineComponent({
  name: "App",
  components: { MainNavigation },
  data() {
    return {
      productStore: useProductStore(),
      cartStore: useCartStore()
    }
  },
  async created() {
    this.cartStore.hydrateFromStorage();
    this.cartStore.initCartStore();
    await this.productStore.init();
  }
});

</script>