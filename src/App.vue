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

export default {
  name: "App",
  components: { MainNavigation }
};

</script>

<style scoped lang="scss">

</style>