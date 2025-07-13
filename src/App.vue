<template>
  <div id="app">
    <header>
      <MainNavigation />
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import MainNavigation from "@/components/MainNavigation.vue";
import { useProductStore } from "./stores/ProductStore";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: { MainNavigation },
  data() {
    return {
      productStore: useProductStore()
    }
  },
  created() {
    this.productStore.initializeProductStructure();
  }
});


</script>

<style scoped lang="scss">

</style>