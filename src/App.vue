<template>
  <div id="app">
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
  created() {
    this.productStore.initializeProductStructure();
    this.cartStore.hydrateFromStorage();
    this.cartStore.initCartStore();
  },
});


</script>

<style scoped lang="scss">

</style>