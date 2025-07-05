<template>
    <div @click="$emit('categories-section-open')" class="categories-wrapper">
        <span class="categories">Категории: {{ currentCategory }}</span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "CategoriesSection",
    data() {
        return {
            currentCategory: "Все"
        }
    }
});
</script>

<style scoped lang="scss">
@use "sass:color";
@use '/src/assets/variables' as vars;
.categories-wrapper {
    margin: 10px;
    margin-bottom: 20px;
}
.categories {
    justify-content: center;
    min-height: 50px;
    display: flex;
    align-items: center;
    border-radius: 15px;
    background-color: vars.$supporting-golden;
}
</style>