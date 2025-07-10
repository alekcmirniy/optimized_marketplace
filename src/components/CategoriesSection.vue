<template>
    <div @click="$emit('categories-section-open')" class="categories-wrapper">
        <span class="categories">Категории: {{ currentCategories ? currentCategories : "Все"}}</span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "CategoriesSection",
    props: {
        currentCategories: {
            type: String,
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
    width: 100%;
    text-align: center;
    padding: 0 10px;
    min-height: 50px;
    line-height: 50px;
    display: inline-block;
    border-radius: 15px;
    background-color: vars.$supporting-golden;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>